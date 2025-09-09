// src/hooks/useDialog.js
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import DialogWrapper from "@/components/dialog/dialogWrapper"

export function useDialog() {
  const [container] = useState(() => document.createElement("div"))
  const [visible, setVisible] = useState(false)
  const [dialogProps, setDialogProps] = useState({
    title: "",
    description: "",
    content: null,
  })

  useEffect(() => {
    document.body.appendChild(container)
    return () => container.remove()
  }, [container])

  const showDialog = ({ title, description, content }) => {
    setDialogProps({ title, description, content })
    setVisible(true)
  }

  const closeDialog = () => setVisible(false)

  const DialogPortal = visible
    ? createPortal(
        <DialogWrapper
          open={visible}
          onOpenChange={setVisible}
          title={dialogProps.title}
          description={dialogProps.description}
        >
          {dialogProps.content}
        </DialogWrapper>,
        container
      )
    : null

  return { showDialog, closeDialog, DialogPortal }
}
