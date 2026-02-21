import { MdOutlineAttachEmail, MdLocationPin, MdOutlineMiscellaneousServices } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { FcManager, FcMultipleDevices, FcRedo, FcInspection, FcList } from "react-icons/fc";
import { IoWalletOutline, IoBriefcaseOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { CiEdit, CiShop, CiBellOn, CiCircleList} from "react-icons/ci";
import { IoMdStopwatch } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FiAlertOctagon } from "react-icons/fi";
import { FcCalendar } from "react-icons/fc";

export const Icons = {
    Eye: FaRegEye,
    EyeOff: FaRegEyeSlash,
    Email: MdOutlineAttachEmail,
    Phone: BsTelephone,
    Manager: FcManager,
    Dashboard: FcMultipleDevices,
    Wallet: IoWalletOutline,
    Edit: CiEdit,
    Watch: IoMdStopwatch,
    Calendar: IoCalendarNumberOutline,
    User: FaRegUser,
    BackArrow: IoIosArrowBack,
    ForwardArrow: IoIosArrowForward,
    Shop: CiShop,
    Address: MdLocationPin,
    Lock: TbLockPassword,
    Logout: FcRedo,
    Brifcase: IoBriefcaseOutline,
    Speciality: FcInspection,
    Service: MdOutlineMiscellaneousServices,
    Bell: CiBellOn,
    Success: FcOk,
    Error: FcCancel,
    Alert: FiAlertOctagon,
    colorCalendar: FcCalendar,
    list: FcList,

};
