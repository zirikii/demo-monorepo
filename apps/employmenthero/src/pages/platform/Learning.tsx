import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PanelCard } from "@/components/platform/PanelCard";
import { StatTile } from "@/components/platform/StatTile";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LEARNING_COURSES } from "@/data/platform";

export default function PlatformLearning() {
  const mandatory = LEARNING_COURSES.filter((course) => course.mandatory);
  const averageCompletion = Math.round(
    LEARNING_COURSES.reduce((total, course) => total + course.completion, 0) / LEARNING_COURSES.length,
  );
  const outstanding = mandatory.filter((course) => course.completion < 100).length;

  return (
    <PlatformLayout
      title="Learning"
      description="Compliance and skills training powered by Go1"
      actions={
        <ButtonLink to="/products/learning-management-system" variant="secondary" size="sm">
          About learning management
        </ButtonLink>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Assigned courses" value={String(LEARNING_COURSES.length)} />
        <StatTile label="Mandatory courses" value={String(mandatory.length)} />
        <StatTile
          label="Average completion"
          value={`${averageCompletion}%`}
          trend="+6% this quarter"
          trendTone="positive"
        />
        <StatTile
          label="Outstanding compliance"
          value={String(outstanding)}
          trend="Courses below 100%"
          trendTone="critical"
        />
      </div>

      <div className="mt-6">
        <PanelCard title="Course library" subtitle="Assigned by role, site and award">
          <ul className="grid gap-4 md:grid-cols-2">
            {LEARNING_COURSES.map((course) => (
              <li key={course.id} className="flex flex-col gap-3 rounded-eh border border-line px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.98rem] font-bold text-ink-strong">{course.title}</p>
                    <p className="text-sm text-ink-faint">
                      {course.provider} · {course.duration}
                    </p>
                  </div>
                  {course.mandatory ? <Badge tone="critical">Mandatory</Badge> : <Badge tone="neutral">Optional</Badge>}
                </div>
                <ProgressBar
                  value={course.completion}
                  label={`${course.enrolled} enrolled`}
                  tone={course.completion === 100 ? "positive" : course.mandatory ? "caution" : "purple"}
                />
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>
    </PlatformLayout>
  );
}
