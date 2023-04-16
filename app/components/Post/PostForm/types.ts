import type { ComponentPropsWithoutRef } from 'react';

// props will be a union type of the ActionData type and the ComponentPropsWithoutRef type
export type Props = ComponentPropsWithoutRef<'form'> & {
    // these props won't exist until the form is submitted so they should be optional or ts will complain
    error?: {
      formError?: string[]
      fieldErrors?: {
        title?: string[]
        body?: string[]
      }
    }
    fields?: {
      title?: string
      body?: string
    }
}