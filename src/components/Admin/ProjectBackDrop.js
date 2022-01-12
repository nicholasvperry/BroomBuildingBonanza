import React from "react";
import {motion} from "framer-motion"

export const ProjectBackdrop = ({children, onClick}) => {
    return (
        <motion.div
            className="projectBackdrop"
            onClick={onClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {children}

            
        </motion.div>
    )
}