import React from "react";

import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from "@chakra-ui/react";

const Modal = ({
    title,
    overlayClick = false,
    isOpen,
    onClose,
    onSuccessText,
    isSubmitting,
    handleSubmit,
    onSubmit,
    size = "xl",
    children,
}) => {
    return (
        <ChakraModal
            size={size}
            closeOnOverlayClick={overlayClick}
            isOpen={isOpen}
            onClose={onClose}
            preserveScrollBarGap
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontWeight={400}>{title}</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody pb={6}>{children}</ModalBody>
                    <ModalFooter>
                        <Button
                            mr={3}
                            colorScheme="blue"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            {onSuccessText}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </ChakraModal>
    );
};

export default Modal;
