// Toast — re-export Sonner's Toaster + toast function with BHMUI styling hooks.
// Usage:
//   1. Add <Toaster /> once at your app root.
//   2. Call toast('Message') or toast.success('Done') anywhere.
//
// CSS: .blob-toast styles in src/styles/molecules/toast.css
// Sonner respects the `className` and `toastOptions` props for custom classes.

export { Toaster, toast } from 'sonner'
export type { ToasterProps } from 'sonner'

// Pre-configured Toaster with BHMUI classes.
// Consumers can use <BlobToaster /> instead of <Toaster /> for zero-config setup.
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner'
import * as React from 'react'

export function BlobToaster(props: ToasterProps) {
  return (
    <SonnerToaster
      toastOptions={{
        classNames: {
          toast:       'blob-toast',
          title:       'blob-toast__title',
          description: 'blob-toast__description',
          actionButton:'blob-toast__action',
          cancelButton:'blob-toast__cancel',
          closeButton: 'blob-toast__close',
          success:     'blob-toast--success',
          error:       'blob-toast--error',
          warning:     'blob-toast--warning',
          info:        'blob-toast--info',
        },
      }}
      {...props}
    />
  )
}
