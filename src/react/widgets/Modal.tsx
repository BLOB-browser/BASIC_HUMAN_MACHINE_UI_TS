import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '../../utils/cn'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  /** sm = 400px, md = 560px (default), lg = 720px, full */
  size?: 'sm' | 'md' | 'lg' | 'full'
  /** Element that triggered the modal — focus returns here on close */
  triggerRef?: React.RefObject<HTMLElement>
  /** Whether clicking the overlay closes the modal */
  closeOnOverlayClick?: boolean
  className?: string
}

const SIZE_CLASS: Record<NonNullable<ModalProps['size']>, string> = {
  sm:   'blob-modal--sm',
  md:   '',
  lg:   'blob-modal--lg',
  full: 'blob-modal--full',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="blob-modal-overlay"
          onClick={closeOnOverlayClick ? undefined : (e) => e.stopPropagation()}
        />
        <Dialog.Content
          className={cn('blob-modal', SIZE_CLASS[size], className)}
          onInteractOutside={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
        >
          {(title || description) && (
            <div className="blob-modal__header">
              {title && <Dialog.Title className="blob-modal__title">{title}</Dialog.Title>}
              {description && (
                <Dialog.Description className="blob-modal__description">{description}</Dialog.Description>
              )}
              <Dialog.Close asChild>
                <button className="blob-modal__close" aria-label="Close">
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="16" height="16">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
          )}
          <div className="blob-modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
