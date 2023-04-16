// the types are defined in types.ts
import type { Props } from './types'
// we can't use 'title' because this is already a defined var in ComponentPropsWithoutRef
// 'header' is used instead

function Post({ header, children }: Props) {
    return (
        <div className='flex flex-col p-6 max-w-md border rounded'>
            {header && <h2 className='font-bold text-2xl text-gray-900'>{header}</h2>}
            <p className='mt-4 text-lg text-gray-900'>{children}</p>
        </div>
    );
};

export default Post;