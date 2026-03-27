import React, { useState, useEffect, useRef } from 'react';
import { User as UserIcon } from "lucide-react";
import { User } from "@/api/entities/User";
import { cn } from "@/lib/utils";

const avatarColors = [
  'bg-violet-500', 'bg-pink-500', 'bg-sky-500', 'bg-emerald-500',
  'bg-orange-500', 'bg-indigo-500', 'bg-rose-500', 'bg-teal-500',
];

function getColor(name) {
  const code = (name || '').charCodeAt(0) || 0;
  return avatarColors[code % avatarColors.length];
}

export default function PeopleCell({ value, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    User.listAll()
      .then(data => setMembers(data || []))
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const handleSelect = (name) => {
    onUpdate(name);
    setIsOpen(false);
  };

  if (!value) {
    return (
      <div className="relative" ref={ref}>
        <div
          className="cursor-pointer text-muted-foreground hover:bg-accent hover:rounded px-2 py-1 -mx-2 -my-1 transition-colors flex items-center gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserIcon className="w-4 h-4" />
          <span>Assign</span>
        </div>
        {isOpen && <MemberDropdown members={members} loading={loading} onSelect={handleSelect} onClear={null} />}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <div
        className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium', getColor(value))}>
          {value.charAt(0).toUpperCase()}
        </div>
        <span className="text-foreground text-xs truncate">{value}</span>
      </div>
      {isOpen && <MemberDropdown members={members} loading={loading} onSelect={handleSelect} onClear={() => handleSelect('')} />}
    </div>
  );
}

function MemberDropdown({ members, loading, onSelect, onClear }) {
  return (
    <div className="absolute top-full left-0 mt-1 z-30 bg-popover border border-border rounded-lg shadow-lg py-1 min-w-[200px] max-h-[240px] overflow-y-auto">
      {loading ? (
        <div className="px-3 py-4 text-xs text-muted-foreground text-center">Loading...</div>
      ) : members.length === 0 ? (
        <div className="px-3 py-4 text-xs text-muted-foreground text-center">No team members found</div>
      ) : (
        <>
          {members.map(m => (
            <button
              key={m.id}
              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-accent transition-colors text-left"
              onClick={() => onSelect(m.full_name || m.email)}
            >
              <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0', getColor(m.full_name || m.email))}>
                {(m.full_name || m.email || '?').charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="text-sm text-foreground truncate">{m.full_name || 'Unnamed'}</div>
                {m.email && <div className="text-[11px] text-muted-foreground truncate">{m.email}</div>}
              </div>
            </button>
          ))}
          {onClear && (
            <>
              <div className="border-t border-border my-1" />
              <button
                className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-accent transition-colors text-left text-sm text-muted-foreground"
                onClick={onClear}
              >
                <UserIcon className="w-4 h-4" />
                Unassign
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
