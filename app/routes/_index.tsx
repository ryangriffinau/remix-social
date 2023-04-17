import { V2_MetaFunction, json, redirect } from "@remix-run/node";
import { LoaderFunction, ActionFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react"; 
import { getPosts, createPost } from "~/services/posts.server";
import type { Post } from "~/services/posts.server";
import { Post as PostComponent } from '~/components/Post'
import { PostForm } from "~/components/Post/PostForm";
import { CreatePost } from "~/services/validations";


export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

// TYPES
// LoaderData is the type of the data returned from the loader function
// we were just retrieving one type originally (Post[]) but now we are returning multiple types (Post & author)
// now we are using the types which are returned by the getPosts function
// Awaited will unwrap a promise type - we are using a prisma promise < > so we need to unwrap it
// previously you'd have to add a custom type to do the unwrapping 
// you can also now update getPosts and it's types without having to update the loader function
type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
}

type ActionData = {
  error: {
    formError?: string[]
    fieldErrors?: {
      title: string[]
      body: string[]
    }
  fields: {
    title?: string
    body?: string
  }
}
}
// action functions are used in Remix to handle write (POST PUT) type requests
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const rawTitle = form.get('title');
  const rawBody = form.get('body');
  
  // zod witll throw err if safeparse validation fails
  const result = CreatePost.safeParse({title: rawTitle, body: rawBody});

  if (!result.success) {
    return json({
      error: result.error.flatten(),
      fields: {
        title: rawTitle,
        body: rawBody
      }
    }, {status: 400})
  }

  await createPost({
    title: result.data.title ?? null,
    body: result.data.body,
    authorId: "bad-id-will-fix"
  }
  );

  return redirect('/');
}


export const loader: LoaderFunction = async () => {
  const data: LoaderData = {posts: await getPosts()}

  // remixes helper json function handles all headers etc needed to return json response
  return json(data);
}


export default function Index() {
  // useLoaderData returns LoaderData type and we are destructuring the posts out of it
  const { posts } = useLoaderData<LoaderData>();

  // useAction returns ActionData type from the json returned from the action function
  // its a hook so will auto-trigger 
  const formData = useActionData<ActionData>();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold underline mb-2">💬 Remix Social App</h1>
      {/* we don't define the action prop inside the component as it depends on page context its rendered in  */}
      {/* form is being called inside an index action, remix uses this to determine the POST action is occurring inside an index route and not a parent layout component */}
      <PostForm
        action="/?index"
        error={formData?.error}
        fields={formData?.fields} 
      />
      <ul>
        {posts.map((post) =>(
        <li className="mb-2" key={post.title && "-" && post.id.substring(0,8)}>
          <PostComponent 
            header={post?.title}
            authorName={post?.author?.email}
          >
            {post.body}
          </PostComponent>
          
        </li>))
        }
      </ul>
    </div>
  );
}
