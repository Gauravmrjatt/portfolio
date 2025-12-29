'use client';

import { Dock, DockItem, DockIcon, DockLabel, ScrollSpy } from '@/components/Dock';
import ThemeToggle from '@/components/ThemeToggle';
import { dockItems } from '@/lib/dock-data';

export default function FloatingDock() {
  return (
    <div className="fixed bottom-0 md:bottom-6 left-1/2 -translate-x-1/2 z-40">

      <Dock>
        {dockItems.map((item) => (
          <DockItem key={item.title} href={item.href} sectionId={item.sectionId}>
            <DockIcon>
              {item.icon === 'theme' ? (
                <ThemeToggle />
              ) : (
                <item.icon />
              )}
            </DockIcon>
            <DockLabel>{item.title}</DockLabel>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
