
import { Header } from "@/components/Header";
import { RoutineTable } from "@/components/RoutineTable";
import { DetailPanel } from "@/components/DetailPanel";
import { RoutineManager } from "@/components/RoutineManager";
import { BlogPost } from "@/components/BlogPost";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">My mkk360Routine</h2>
          <p className="text-muted-foreground">
            Manage your daily schedule and habits. Click on any item to add notes or mark as complete.
          </p>
        </div>
        
        <BlogPost />
        <RoutineManager />
        <RoutineTable />
        <DetailPanel />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
