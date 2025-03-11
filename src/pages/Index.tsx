import Form from "@/components/Form";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Formie</h1>
        <p className="text-gray-500 mt-2">
          A dynamic form with validation and state management
        </p>
      </header>
      <Form />
    </div>
  );
};

export default Index;
