import type {Post} from '@prisma/client'
import {db} from '~/services/db.server'
// keep the Post type in the same place as your Post db access fn
export type{ Post }

export const getPosts = () => db.post.findMany()

// Pick utility type allows you to create a type from the object being passed in
// so we can pass in the Post type from Prisma and reference the title and body in the type
// on create, ts expects data
export const createPost = ({title, body}: Pick<Post, 'title' | 'body'> ) => {
    return db.post.create({
        data: {
            title,
            body,
        },
    });
};