import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stethoscope, Users, Calendar, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-doc-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-doc-text">MedConnect</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link to="/doctor-registration">
                <Button className="bg-doc-primary hover:bg-doc-primary/90">
                  Join as Doctor
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-doc-text mb-6">
            Connect Patients with
            <span className="text-doc-primary"> Qualified Doctors</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our platform to provide quality healthcare services. Register
            as a doctor and start connecting with patients who need your
            expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/doctor-registration">
              <Button
                size="lg"
                className="bg-doc-primary hover:bg-doc-primary/90 text-lg px-8 py-4"
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Register as Doctor
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-doc-primary text-doc-primary hover:bg-doc-primary/5 text-lg px-8 py-4"
            >
              <Users className="w-5 h-5 mr-2" />
              Find Doctors
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-doc-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-doc-primary" />
            </div>
            <h3 className="text-xl font-semibold text-doc-text mb-3">
              Professional Profile
            </h3>
            <p className="text-gray-600">
              Create a comprehensive professional profile showcasing your
              qualifications, specializations, and experience.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-doc-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-doc-accent" />
            </div>
            <h3 className="text-xl font-semibold text-doc-text mb-3">
              Flexible Scheduling
            </h3>
            <p className="text-gray-600">
              Set your availability across multiple clinics and offer both
              in-person and online consultations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-doc-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-doc-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-doc-text mb-3">
              Secure Platform
            </h3>
            <p className="text-gray-600">
              Your data and patient information are protected with
              industry-standard security measures and compliance.
            </p>
          </div>
        </div>

        {/* Registration Process */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-doc-text mb-4">
              Simple Registration Process
            </h2>
            <p className="text-gray-600 text-lg">
              Get started in just a few steps and begin connecting with patients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-doc-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                1
              </div>
              <h4 className="font-semibold text-doc-text mb-2">
                Personal Info
              </h4>
              <p className="text-sm text-gray-600">
                Basic details and profile setup
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-doc-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                2
              </div>
              <h4 className="font-semibold text-doc-text mb-2">
                Qualifications
              </h4>
              <p className="text-sm text-gray-600">
                Education and licensing info
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-doc-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                3
              </div>
              <h4 className="font-semibold text-doc-text mb-2">
                Specialization
              </h4>
              <p className="text-sm text-gray-600">Services and availability</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-doc-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                4
              </div>
              <h4 className="font-semibold text-doc-text mb-2">
                Start Practice
              </h4>
              <p className="text-sm text-gray-600">
                Review and begin consultations
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/doctor-registration">
              <Button
                size="lg"
                className="bg-doc-primary hover:bg-doc-primary/90 text-lg px-12 py-4"
              >
                Start Registration Now
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-doc-text text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-doc-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold">MedConnect</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting healthcare professionals with patients for better
              health outcomes.
            </p>
            <p className="text-gray-400 text-sm">
              © 2024 MedConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
