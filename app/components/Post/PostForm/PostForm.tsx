// import type {ComponentPropsWithoutRef} from 'react'
import type { Props } from './types'

function PostForm({ 
    method = 'post',
    error = {},
    fields = {title: '', body: ''},
    ...props
}: Props ) {
  return (
    // gap-4 means all margin bars mb-4 can be removed/reduced from children elements
    <form className="flex flex-col gap-4" method={method} {...props}>
      <div className="flex flex-col">
        <label htmlFor="title" className="text-gray-600">
          Title
        </label>
        <input
          className="p-4"
          name="title"
          placeholder="Title of your post"
          //   default value is required because the page will be re-rendered if there is an error
          defaultValue={fields?.title}
        />
        {error?.fieldErrors?.title && <p className='text-red-500'>{error.fieldErrors.title}</p>}
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="body" className="mb-2 text-gray-600">
          Body
        </label>
        <textarea
          defaultValue={fields?.body}
          className="p-4"
          name="body"
          placeholder="Write something amazing"
        />
        {error?.fieldErrors?.body && <p className='text-red-500'>{error.fieldErrors.body}</p>}
      </div>
      {error?.formError && <p className='text-red-500'>{error.formError}</p>}
      <button
        type="submit"
        className="transition rounded text-blue-700 font-bold py-4 px-6 transparent hover:bg-gray-100"
      >
        Create Post
      </button>
    </form>
  )
}

export default PostForm