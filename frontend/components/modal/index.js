import styles from "./Modal.module.css";
import { useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const Modal = forwardRef(({ height, title, children, forced }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true),
            close: () => setOpen(false),
        };
    });

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        inital={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                delay: 0.2,
                            },
                        }}
                        onClick={() => setOpen(forced ? true : false)}
                        className={styles.backdrop}
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                            scale: 1,
                            transition: {
                                duration: 0.2,
                            },
                        }}
                        exit={{
                            scale: 0,
                            transition: {
                                delay: 0.2,
                            },
                        }}
                        className={styles.wrapper}
                        style={{
                            height: height ?? "500px",
                        }}
                    >
                        <motion.div
                            initial={{
                                x: 100,
                                opacity: 0,
                            }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                transition: {
                                    delay: 0.2,
                                    duration: 0.2,
                                },
                            }}
                            exit={{
                                x: 100,
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                },
                            }}
                            className={styles.content}
                        >
                            <div className={styles.titleBar}>
                                {title}
                                {!forced && (
                                    <button
                                        className={styles.titleBarClose}
                                        onClick={() => ref.current.close()}
                                    >
                                        <AiOutlineClose />
                                    </button>
                                )}
                            </div>
                            <div className={styles.body}>{children}</div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});

export default Modal;
