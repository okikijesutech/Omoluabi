import { FaHouse } from "react-icons/fa6";
import { GiChest, GiPoliceBadge } from "react-icons/gi";
import { RiCharacterRecognitionFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { IconType } from "react-icons";

export interface NavLink {
  to: string;
  label: string;
  icon: IconType;
  matchType: "exact" | "prefix";
}

export const SIDEBAR_LINKS: NavLink[] = [
  { to: "/learnlanguage", label: "LEARN", icon: FaHouse, matchType: "exact" },
  { to: "/LearnLanguage/literacy", label: "LITERACY", icon: RiCharacterRecognitionFill, matchType: "prefix" },
  { to: "/LearnLanguage/leaderboard", label: "LEADERSBOARD", icon: GiPoliceBadge, matchType: "exact" },
  { to: "/LearnLanguage/quests", label: "QUESTS", icon: GiChest, matchType: "exact" },
  { to: "/LearnLanguage/shop", label: "SHOP", icon: CiShop, matchType: "exact" },
  { to: "/LearnLanguage/profile", label: "PROFILE", icon: FaUser, matchType: "exact" },
];

export interface Language {
  name: string;
  code: string;
}

export const LANGUAGES: Language[] = [
  { name: "Hausa", code: "ha" },
  { name: "Yoruba", code: "yo" },
  { name: "Igbo", code: "ig" },
  { name: "Fulfulde (Fulani)", code: "ff" },
  { name: "Kanuri", code: "kr" },
  { name: "Ibibio", code: "ib" },
  { name: "Tiv", code: "tv" },
  { name: "Ijaw", code: "ij" },
  { name: "Edo", code: "ee" },
  { name: "Urhobo", code: "ur" },
  { name: "Nupe", code: "nu" },
  { name: "Gbagyi", code: "gb" },
  { name: "Jukun", code: "ju" },
  { name: "Idoma", code: "id" },
  { name: "Igala", code: "ig" },
  { name: "Berom", code: "be" },
  { name: "Ebira", code: "eb" },
  { name: "Anang", code: "an" },
  { name: "Efik", code: "ef" },
  { name: "Isoko", code: "is" },
];
