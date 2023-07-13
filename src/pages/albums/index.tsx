import StackedLayout from "~/components/StackedLayout";
import { protectedSsr } from "~/utils/protected-ssr";

export default function AlbumsPage() {
  return (
    <StackedLayout>
      <h2 className="bg-base-100">Albums</h2>
    </StackedLayout>
  );
}

export const getServerSideProps = protectedSsr();
