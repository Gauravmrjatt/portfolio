import {
  Home,
  Code,
  FolderKanban,
  Trophy,
  BarChart3,
  Mail,
} from 'lucide-react';

export const dockItems = [
  { title: 'Home', icon: Home, href: '/#home', sectionId: 'home' },
  { title: 'Skills', icon: Code, href: '/#skills', sectionId: 'skills' },
  { title: 'Projects', icon: FolderKanban, href: '/#projects', sectionId: 'projects' },
  { title: 'Achievements', icon: Trophy, href: '/#achievements', sectionId: 'achievements' },
  { title: 'Stats', icon: BarChart3, href: '/#stats', sectionId: 'stats' },
  { title: 'Contact', icon: Mail, href: '/#contact', sectionId: 'contact' },
  { title: 'Theme', icon: 'theme', href: null, sectionId: null },
];
