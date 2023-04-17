// the types are defined in types.ts
import type { Props } from './types'
// we can't use 'title' because this is already a defined var in ComponentPropsWithoutRef
// 'header' is used instead

function Post({ header, authorName, children }: Props) {
    // the && b/w props and element is a shortcut to conditionally render based on the prop existing
    // It's a logical AND operator, which means it returns the first falsy value encountered in the expression or the last value if all values are truthy.
    return (
        <div className='flex flex-col p-6 max-w-md border rounded'>
            {header && <h2 className='font-bold text-2xl text-gray-900'>{header}</h2>}
            {authorName && <p className='text-sm text-gray-600 italic'>{authorName}</p>}
            <p className='mt-4 text-lg text-gray-900'>{children}</p>
        </div>
    );
};

export default Post;