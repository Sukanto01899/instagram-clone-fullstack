import { SuccessIcon, SuccessRedIcon } from "./statusPopupIcon";

const popupTemplate = {
    success: {
        postCreated: {
            title: "Success!",
            buttonText: "Continue",
            message: "Your post has been shared successfully.",
            Icon: SuccessIcon
        },
        accountCreated:{
            title: "Account Created!",
            buttonText: "Continue",
            message: "Your account has been created successfully.",
            Icon: SuccessIcon,
            footer: "Complete Your Profile"
        },
        storyPosted: {
            title: "Story Posted!",
            buttonText: "Continue",
            message: "Your story has been posted successfully.",
            Icon: SuccessRedIcon,
            closeButton: "Close"
        }
    },
    updated: {
        postUpdated: {
            title: "Post Updated!",
            buttonText: "Continue",
            message: "Your post has been updated successfully.",
            Icon: SuccessIcon
        },
        passwordChanged: {
            title: "Password Changed!",
            buttonText: "Continue",
            message: "Your password has been changed successfully.",
            Icon: SuccessIcon
        },
        postSaved: {
            title: "Post Saved!",
            buttonText: "Continue",
            message: "Your post has been saved successfully.",
            Icon: SuccessIcon
        }
    }
}

export default popupTemplate;