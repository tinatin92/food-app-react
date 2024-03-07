import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = '', onClose }) {
    const dialog = useRef(null);

    useEffect(() => {
        const modal = dialog.current
        if (open && dialog.current) {
            modal.showModal();
        }
        return () => {modal.close()}
    }, [open]);

    return createPortal(
        <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal') // Use correct method to access element by ID
    );
}
