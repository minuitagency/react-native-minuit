import logoFull from "./images/logoFull.png";

import home from "./icons/home.png";
import back from "./icons/back.png";
import close from "./icons/close.png";
import addPhoto from "./icons/addPhoto.png";
import settings from "./icons/settings.png";
import notify from "./icons/notify.png";
import calendar from "./icons/calendar.png";
import back2 from "./icons/back2.png";
import search from "./icons/search.png";
import tick from "./icons/tick.png";
import joined from "./icons/joined.png";
import waiting from "./icons/waiting.png";
import add from "./icons/add.png";
import iconLock from "./icons/iconLock.png";
import iconUser from "./icons/iconUser.png";
import iconShare from "./icons/iconShare.png";
import iconShareToFriend from "./icons/iconShareToFriend.png";
import iconNext from "./icons/iconNext.png";
import deleteKeyboard from "./icons/deleteKeyboard.png";
import backKeyboard from "./icons/backKeyboard.png";
import arrowThin from "./icons/arrowThin.png";
import trash from "./icons/trash.png";
import edit from "./icons/edit.png";
import burger from "./icons/burger.png";
import showHide from "./icons/showHide.png";

export enum IconType {
  Home = "home",
  Edit = "edit",
  Back = "back",
  Close = "close",
  AddPhoto = "addPhoto",
  Settings = "settings",
  Notify = "notify",
  Calendar = "calendar",
  Back2 = "back2",
  Search = "search",
  Tick = "tick",
  Joined = "joined",
  Waiting = "waiting",
  Add = "add",
  IconLock = "iconLock",
  IconUser = "iconUser",
  IconShare = "iconShare",
  IconShareToFriend = "iconShareToFriend",
  IconNext = "iconNext",
  DeleteKeyboard = "deleteKeyboard",
  BackKeyboard = "backKeyboard",
  ArrowThin = "arrowThin",
  Trash = "trash",
  Burger = "burger",
  ShowHide = "showHide",
}

export type Icons = {
  [key in IconType]: string;
};

export const icons: Icons = {
  [IconType.Home]: home,
  [IconType.Edit]: edit,
  [IconType.Back]: back,
  [IconType.Close]: close,
  [IconType.AddPhoto]: addPhoto,
  [IconType.Settings]: settings,
  [IconType.Notify]: notify,
  [IconType.Calendar]: calendar,
  [IconType.Back2]: back2,
  [IconType.Search]: search,
  [IconType.Tick]: tick,
  [IconType.Joined]: joined,
  [IconType.Waiting]: waiting,
  [IconType.Add]: add,
  [IconType.IconLock]: iconLock,
  [IconType.IconUser]: iconUser,
  [IconType.IconShare]: iconShare,
  [IconType.IconShareToFriend]: iconShareToFriend,
  [IconType.IconNext]: iconNext,
  [IconType.DeleteKeyboard]: deleteKeyboard,
  [IconType.BackKeyboard]: backKeyboard,
  [IconType.ArrowThin]: arrowThin,
  [IconType.Trash]: trash,
  [IconType.Burger]: burger,
  [IconType.ShowHide]: showHide,
};

export type Images = {
  logoFull: string;
};

export const images: Images = {
  logoFull,
};