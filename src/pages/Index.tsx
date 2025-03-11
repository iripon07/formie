import DynamicForm from "../components/DynamicForm";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Frontend Developer Challenge
        </h1>
        <DynamicForm />
      </div>
    </div>
  );
};

export default Index;
