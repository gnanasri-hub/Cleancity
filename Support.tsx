import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Send, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I report an issue?",
    answer: "Click on 'Report Issue' in the navigation, fill in the details including location and upload relevant photos or videos. Our AI will help categorize it to the right department."
  },
  {
    question: "Which languages are supported?",
    answer: "Clearशहर supports 12 Indian languages: Hindi, English, Tamil, Telugu, Kannada, Malayalam, Bengali, Odia, Marathi, Gujarati, Punjabi, and Urdu. Messages are automatically translated."
  },
  {
    question: "How does the community chat work?",
    answer: "You can discuss issues with neighbors in real-time. Messages are automatically translated to your preferred language, making communication seamless across language barriers."
  },
  {
    question: "What happens after I report an issue?",
    answer: "Your report is sent directly to the relevant government department. You can track its status and receive updates through the platform."
  },
  {
    question: "Is my location data private?",
    answer: "Yes, location data is only used to route issues to the correct authorities and show nearby problems to help your community."
  }
];

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Support & Help</h1>
            <p className="text-muted-foreground text-lg">
              Get answers to your questions or chat with our AI assistant
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 mb-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Find quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>
                    Chat with our AI helper
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 min-h-[300px] max-h-[400px] overflow-y-auto">
                    <div className="text-sm">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <p className="font-medium mb-1">AI Assistant</p>
                        <p className="text-muted-foreground">
                          Hello! How can I help you today?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Ask a question..." 
                      className="border-border"
                    />
                    <Button size="icon" className="bg-gradient-primary hover:opacity-90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Available in all 12 supported languages
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-gradient-hero text-primary-foreground">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
              <p className="mb-4 opacity-90">
                Our support team is here to assist you
              </p>
              <Button variant="secondary" size="lg">
                Contact Support Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
