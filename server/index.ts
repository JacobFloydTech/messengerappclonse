import {Hono} from 'hono'
import {serve} from '@hono/node-server'
import {cors} from 'hono/cors';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { JWTUser } from './types';
dotenv.config()
const prisma = new PrismaClient()
const app = new Hono();
app.use("*", cors())

app.post('/signIn', async(c) => { 
    const {email, password} = await c.req.json();
    if (!email || !password) { c.status(404); return c.json({error: "Require creds"})}
    const existingUser = await prisma.user.findUnique({
        where: { 
            email: email
        }
    })
    if (!existingUser) { c.status(404); return c.json({error: "user does not exist"})}
    const result = await bcrypt.compareSync(password, existingUser.password);
    if (!result) { c.status(401); return c.json({error: "Wrong password"})} 
    c.status(201)
    const token = jwt.sign({id: existingUser.id}, process.env.JWT_SECRET!, { expiresIn: 60*60*24})
    return c.json({token})
})

app.post('/getLastOnline', async (c) => { 
    const {id} = await c.req.json();
    try { 
        const data = await prisma.user.findUnique({
            where: {id},
            select: { messages: { 
                orderBy: {time: 'desc'},
                take: 1,
            }}
        })
        c.status(201)
        return c.json({time: data?.messages[0].time})
    } catch (error) {c.status(500); return c.json({error})}
})

app.post('/signUp', async (c) => { 
    const {email, name, password, profilePicture} = await c.req.json();
    if (!email || !name || !password)  { c.status(404); return c.json({error: "Require creds"})}
    const existingUser = await prisma.user.findUnique({
        where: { 
            email: email
        }
    })
    if (existingUser) { c.status(401); return c.json({error: "User exists"})}
    const hash = await bcrypt.hashSync(password, 10);
    const data = await prisma.user.create({
        data: { 
            email,
            password: hash,
            name,
            profilePicture
        }
    })
    c.status(200)
    return c.json(data);
})


app.post('/verifyToken', async (c) => { 
    const {token } = await c.req.json();
    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET!) as JWTUser;
        const newToken = createNewToken(data);
        return c.json({verify: true, token: newToken, id: data.id})
    } catch (e) {
        console.log(e);
        return c.json({verify: false})
    }
})

app.post('/searchUsers', async(c) => { 
    const {query, id} = await c.req.json();
    try {
        const existingFriendsData = await prisma.user.findUnique({
            where: { id}, include: { friends: true}
        })
        const users = await prisma.user.findMany({
            where: { 
                id: { 
                    not: id,
                    notIn: existingFriendsData?.friends.map(e => e.id) ?? []
                },
                name: {
                    contains: query,
                    mode: "insensitive"
                }
            }
        })
        c.status(201)
        return c.json({users})
    } catch (e) {
        c.status(500);
        return c.json({error: e})
    }
})

app.post('/getFriends', async (c) => { 
    const {id} = await c.req.json();
    try { 
        const user = await prisma.user.findUnique({where: {id}, include: {friends: true}})
        return c.json({data: user?.friends})
    } catch (e) { }
    c.status(500)
    return c.json({error: "Something went wrong"})
})

app.post('/getFriendRequests', async (c) => { 
    const {id}  = await c.req.json();
    try { 
        const user = await prisma.user.findUnique({where: {id}, include: { 
            sendRequests: {include: { RecievingUser: true, SendingUser: true}},
            recieveRequests: {include: { RecievingUser: true, SendingUser: true}},
        }},)
        c.status(201)
        return c.json({sentRequests: user?.sendRequests, incomingRequests: user?.recieveRequests})
    } catch (e) {}
    c.status(500)
    return c.json({error: "Something went wrong"})
})


app.post('/sendFriendRequest', async (c) => { 
    const {sendID, recieveID} = await c.req.json();
    try { 
        await prisma.friendRequest.create({
            data: { 
                userID: sendID,
                RecievingUserID: recieveID
            }
        })
        c.status(200)
        return c.json({message: "Friend Reuqest sent!"})
    } catch (e) { c.status(500); return c.json({error: e})}
})


app.post('/acceptFriendRequest', async (c) => { 
    const {id, sendingUserID} = await c.req.json();
    try { 
        await prisma.friendRequest.deleteMany({
            where: { 
                userID: sendingUserID,
                RecievingUserID: id
            }
        })
        await prisma.user.update({
            where: { 
                id: sendingUserID
            }, data: { 
                friends: { 
                    connect: {id: id},
                }
            }
        })
        await prisma.user.update({
            where: { 
                id: id
            }, data: { 
                friends: { 
                    connect: {id: sendingUserID}
                }
            }
        })
        c.status(200)
        return c.json({message: "Accepted"})
    } catch (error) { c.status(500); return c.json({error})}
})

app.post('/denyFriendRequest', async (c) => { 
    const {id, sendingUserID} = await c.req.json();
    try { 
        await prisma.friendRequest.deleteMany({
            where: { 
                userID: sendingUserID,
                RecievingUserID: id
            }
        })
    } catch (error) { c.status(500); return c.json({error})}
})

app.post('/getMessages', async (c) => { 
    const {id, selectedUserID} = await c.req.json()
    try { 
        let data = await prisma.user.findUnique({
            where: {id},
            include: { messages: {
                where: { 
                    recievingUserID: selectedUserID,
                }, include: { 
                    author: true,
                    parentMessage: true,
                }
            }, recievedMessages: {
                where: { 
                    authorID: selectedUserID
                }, include: { 
                    author: true,
                    parentMessage: true
                }
            }}
        })
        const messages = data?.messages.concat(data?.recievedMessages)
        messages?.sort((a,b) => Number(a.time) - Number(b.time))
        c.status(201)
        return c.json({messages})
    } catch ( error) { c.status(500); return c.json({error})}
})

app.post('/sendMessage', async (c) => { 
    const {id, selectedUserID, content, parentID} = await c.req.json();
    try { 
        await prisma.message.create({
            data: { 
                authorID: parseFloat(id),
                recievingUserID: parseFloat(selectedUserID),
                content: content,
                parentMessageID: parentID,
            }
        })
        c.status(200);
        return c.json({success: true})
    } catch ( error) { c.status(500); return c.json({error})}
}) 

function createNewToken(data: Object) { 
    const newToken = jwt.sign(data, process.env.JWT_SECRET!);
    return newToken
}

app.post('/removeFriend', async (c) => { 
    const {id, selectedUserID} = await c.req.json();
    try { 
        await prisma.user.update({
            where: {id},
            data: { 
                friends: { 
                    disconnect: { id: selectedUserID}
                }
            }
        })
        await prisma.user.update({
            where: {id: selectedUserID},
            data: { 
                friends: { 
                    disconnect: { id: id}
                }
            }
        })
        c.status(201)
        return c.json({message: "removed friend"})
    } catch (error) {console.log(error); c.status(500); return c.json({error})}
})

serve(app)
