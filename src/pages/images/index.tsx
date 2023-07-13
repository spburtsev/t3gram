import StackedLayout from "~/components/StackedLayout";
import { protectedSsr } from "~/utils/protected-ssr";

export default function FilesPage() {
  return (
    <StackedLayout>
      <h2 className="text-primary-content">Images</h2>
    </StackedLayout>
  );
}

export const getServerSideProps = protectedSsr();
