// this handles all of the possible attributes for HTML element types that we don't explicitly define e.g. children
import type { ComponentPropsWithoutRef } from "react";

export type Props = ComponentPropsWithoutRef<'div'> & {
    header?: string | null
    authorName?: string | null
}