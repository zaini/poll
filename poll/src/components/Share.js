import React from "react";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TumblrIcon,
    TumblrShareButton,
    TwitterIcon,
    TwitterShareButton,
    ViberIcon,
    ViberShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

export default function ShareButtons(props) {
    return (
        <div className={'share-buttons'}>
            <EmailShareButton url={props.shareUrl}><EmailIcon size={32} round={true}/></EmailShareButton>
            <TwitterShareButton url={props.shareUrl}><TwitterIcon size={32} round={true}/></TwitterShareButton>
            <FacebookShareButton url={props.shareUrl}><FacebookIcon size={32} round={true}/></FacebookShareButton>
            <WhatsappShareButton url={props.shareUrl}><WhatsappIcon size={32} round={true}/></WhatsappShareButton>
            <RedditShareButton url={props.shareUrl}><RedditIcon size={32} round={true}/></RedditShareButton>
            <TumblrShareButton url={props.shareUrl}><TumblrIcon size={32} round={true}/></TumblrShareButton>
            <ViberShareButton url={props.shareUrl}><ViberIcon size={32} round={true}/></ViberShareButton>
            <TelegramShareButton url={props.shareUrl}><TelegramIcon size={32} round={true}/></TelegramShareButton>
        </div>
    );
}