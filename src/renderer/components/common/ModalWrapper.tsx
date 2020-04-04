import * as React from 'react';
import { useEffect, useState } from 'react';
require('./contextMenu.scss');

const Modal = ({ isShown, closeModal, noActions, children }: any) => {
    const [isVisible, setIsVisible] = useState(false);

    const disableBackgroundScrollScrolling = () => {
        if (isShown) {
            const html = document.querySelector('html');
            if (html) {
                html.style.maxHeight = '100%';
                html.style.overflow = 'hidden';
            }
        } else {
            const html = document.querySelector('html');
            if (html) {
                html.style.maxHeight = '';
                html.style.overflow = 'auto';
            }
        }
    };

    const syncIsVisible = () => {
        if (isShown) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const hideOnEsc = () => {
        function onEscPress(e: { keyCode: number; }) {
            if (e.keyCode === 27) {
                setIsVisible(iv => {
                    if (iv) {
                        hideModal();
                    }

                    return iv;
                });
            }
        }

        document.addEventListener('keydown', onEscPress);

        return () => {
            document.removeEventListener('keydown', onEscPress);
        };
    };

    useEffect(hideOnEsc, []);
    useEffect(disableBackgroundScrollScrolling, [isShown]);
    useEffect(syncIsVisible, [isShown]);

    const hideModal = () => {
        setIsVisible(false);
        setTimeout(() => {
            closeModal();
        }, 200);
    };

    return isShown ? (
        <div className={`modal-window`}>
            <div className="modal-background" onClick={hideModal} />
            <div className={`modal-content ${isVisible ? 'scale-in' : 'scale-out'}`}>
                <button className="modal-close-button" onClick={hideModal}>
                    X
                </button>
                <div className="modal-child-content">{children}</div>
                {noActions ? null : (
                    <div className="modal-actions">
                        <button className="modal-action" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    ) : null;
};

export default Modal;
