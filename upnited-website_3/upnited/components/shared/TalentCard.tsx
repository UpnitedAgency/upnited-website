import { Star, MapPin, BadgeCheck } from "lucide-react";
import { InstagramIcon } from "@/components/shared/SocialIcons";
import { formatFollowers, type TalentProfile } from "@/lib/talent";

export function TalentCard({ talent }: { talent: TalentProfile }) {
  return (
    <div className="card-hover flex h-full flex-col rounded-2xl border border-border-color bg-surface p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${talent.avatarColor} font-display text-lg font-bold text-white`}
        >
          {talent.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-display text-sm font-bold">{talent.name}</p>
            {talent.featured && <BadgeCheck size={15} className="shrink-0 text-brand-primary" />}
          </div>
          <p className="flex items-center gap-1 text-xs text-muted">
            <MapPin size={12} />
            {talent.location}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 flex-1 text-sm text-muted">{talent.bio}</p>

      <div className="mt-4 flex items-center justify-between border-t border-border-color pt-4 text-sm">
        <div className="flex items-center gap-1 font-semibold">
          <Star size={14} className="fill-brand-accent text-brand-accent" />
          {talent.rating.toFixed(1)}
        </div>
        {talent.socials.instagram && (
          <div className="flex items-center gap-1 text-muted">
            <InstagramIcon size={14} />
            {formatFollowers(talent.followers)}
          </div>
        )}
      </div>
    </div>
  );
}
