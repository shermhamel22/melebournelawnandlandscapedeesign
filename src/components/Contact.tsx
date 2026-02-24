import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const phone = (formData.get("phone") as string).trim();
    const email = (formData.get("email") as string).trim();
    const address = (formData.get("address") as string).trim();
    const message = (formData.get("message") as string).trim();

    const { error } = await supabase.from("quote_requests").insert({
      name,
      phone,
      email,
      address,
      message: message || null,
    });

    if (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Contact Info */}
          <div className="text-primary-foreground">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Get In Touch</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6">
              Ready for a Better Lawn?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
              Get your free, no-obligation quote today. We'll assess your property and provide transparent pricing — no surprises, no pressure.
            </p>

            <div className="space-y-6">
              <a 
                href="tel:+13215551234" 
                className="flex items-center gap-4 text-primary-foreground/90 hover:text-accent transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Call us</span>
                  <span className="font-semibold">(321) 555-1234</span>
                </div>
              </a>

              <a 
                href="mailto:hello@melbournelawn.com" 
                className="flex items-center gap-4 text-primary-foreground/90 hover:text-accent transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Email us</span>
                  <span className="font-semibold">hello@melbournelawn.com</span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-primary-foreground/90">
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Service Area</span>
                  <span className="font-semibold">Melbourne, FL & Surrounding Areas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Request Your Free Quote
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Smith"
                    className="bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(321) 555-0000"
                    className="bg-background"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                  Property Address
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="123 Main St, Melbourne, FL"
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Tell Us About Your Lawn
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="What services are you interested in? Any specific concerns?"
                  className="bg-background resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Get My Free Quote
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
