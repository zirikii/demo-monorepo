import { JiraLayout } from "@/components/jira/JiraLayout";
import { RovoPanel } from "@/components/jira/RovoPanel";

export default function RovoPage() {
  return (
    <JiraLayout title="Rovo">
      <div className="mx-auto h-[min(40rem,calc(100vh-10rem))] max-w-3xl">
        <RovoPanel />
      </div>
    </JiraLayout>
  );
}
