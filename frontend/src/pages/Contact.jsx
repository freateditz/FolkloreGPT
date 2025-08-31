import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Heart, 
  Globe, 
  MessageCircle, 
  Clock,
  Users,
  Shield,
  Headphones,
  BookOpen,
  Sparkles,
  Check,
  AlertCircle,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

// Import animated components
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';
import InteractiveCard from '../components/InteractiveCard';
import AnimatedText from '../components/AnimatedText';
import FloatingElements from '../components/FloatingElements';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    culture: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const contactSubmission = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactSubmission),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast({
          title: "✨ Message sent successfully!",
          description: "Thank you for reaching out. Your message has been saved and we'll get back to you within 24 hours.",
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          message: '',
          culture: '',
          consent: false
        });
      } else {
        throw new Error(data.error || 'Failed to save contact submission');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      toast({
        title: "❌ Submission failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@folkloregpt.org",
      description: "General inquiries and support",
      color: "text-blue-600",
      bgColor: "bg-blue-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST",
      color: "text-green-600",
      bgColor: "bg-green-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Cultural Heritage Ave, New York, NY 10001",
      description: "Cultural preservation center",
      color: "text-purple-600",
      bgColor: "bg-purple-500"
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'story-submission', label: 'Story Submission' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media & Press' },
    { value: 'research', label: 'Academic Research' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const cultures = [
    'Khasi', 'Maori', 'Cherokee', 'Inuit', 'Zulu', 'Aboriginal Australian',
    'Quechua', 'Navajo', 'Sami', 'Tibetan', 'Hmong', 'Other'
  ];

  const team = [
    {
      name: "Dr. Sarah Cloudwalker",
      role: "Director of Cultural Affairs",
      email: "sarah@folkloregpt.org",
      specialty: "Indigenous storytelling traditions"
    },
    {
      name: "Kai Tangaroa",
      role: "Language Preservation Lead",
      email: "kai@folkloregpt.org",
      specialty: "Endangered language documentation"
    },
    {
      name: "Dr. Aisha Kone",
      role: "AI Ethics Director",
      email: "aisha@folkloregpt.org",
      specialty: "Ethical AI and cultural sensitivity"
    }
  ];

  const faqs = [
    {
      question: "How can I submit a story from my community?",
      answer: "You can submit stories through our Submit page or contact us directly. We work with community elders to ensure proper permission and attribution."
    },
    {
      question: "Is FolkloreGPT free to use?",
      answer: "Yes! FolkloreGPT is completely free. Our mission is cultural preservation, not profit."
    },
    {
      question: "How do you ensure cultural accuracy?",
      answer: "We work directly with indigenous communities and cultural experts to verify all content before publication."
    },
    {
      question: "Can I use these stories for educational purposes?",
      answer: "Yes, with proper attribution. Please contact us for specific licensing requirements for educational use."
    }
  ];

  return (
    <div className="min-h-screen relative py-8 overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollAnimationWrapper animation="fadeInUp">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <AnimatedText
                text="Get In Touch"
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 bg-clip-text text-transparent"
                animation="gradient"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4">
                <MessageCircle className="w-8 h-8 text-amber-600 animate-pulse" />
              </div>
              <div className="absolute -bottom-4 -left-4">
                <Heart className="w-8 h-8 text-red-600 animate-float" />
              </div>
            </div>
            <AnimatedText
              text="Connect with our team to learn more about cultural preservation, share your stories, or explore partnership opportunities"
              className="text-xl text-amber-600 max-w-3xl mx-auto"
              animation="splitWords"
              delay={500}
            />
          </div>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <ScrollAnimationWrapper animation="fadeInLeft" delay={200}>
              <InteractiveCard className="overflow-hidden">
                <CardHeader className="relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 animate-gradient-x"></div>
                  </div>
                  <div className="relative z-10">
                    <CardTitle className="text-2xl text-amber-800 flex items-center gap-3">
                      <Send className="w-6 h-6 animate-pulse" />
                      Send us a Message
                      <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
                    </CardTitle>
                    <CardDescription className="text-amber-600 text-lg">
                      We'd love to hear from you. Fill out the form below and we'll get back to you soon.
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <Label htmlFor="name" className="text-amber-800 font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105"
                          required
                        />
                      </div>
                      
                      <div className="relative group">
                        <Label htmlFor="email" className="text-amber-800 font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <Label htmlFor="category" className="text-amber-800 font-medium">
                          Inquiry Type *
                        </Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 hover:scale-105">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-md bg-white/90">
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="relative group">
                        <Label htmlFor="culture" className="text-amber-800 font-medium">
                          Cultural Background (Optional)
                        </Label>
                        <Select value={formData.culture} onValueChange={(value) => handleInputChange('culture', value)}>
                          <SelectTrigger className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 hover:scale-105">
                            <SelectValue placeholder="Select your culture" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-md bg-white/90">
                            {cultures.map((culture) => (
                              <SelectItem key={culture} value={culture}>
                                {culture}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="relative group">
                      <Label htmlFor="subject" className="text-amber-800 font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief subject of your message"
                        className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 transition-all duration-300 focus:scale-105"
                        required
                      />
                    </div>

                    <div className="relative group">
                      <Label htmlFor="message" className="text-amber-800 font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        className="border-amber-200/50 focus:border-amber-400 backdrop-blur-sm bg-white/50 min-h-[120px] transition-all duration-300 focus:scale-105"
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.consent}
                        onChange={(e) => handleInputChange('consent', e.target.checked)}
                        className="mt-1 rounded border-amber-300 focus:ring-amber-500"
                        required
                      />
                      <Label htmlFor="consent" className="text-sm text-amber-700 leading-relaxed">
                        I consent to FolkloreGPT storing my information and contacting me regarding my inquiry. 
                        We respect your privacy and will never share your information with third parties.
                      </Label>
                    </div>

                    <div className="relative group">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl relative z-10"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                            Send Message
                          </>
                        )}
                      </Button>
                      <div className="absolute inset-0 bg-orange-400 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                    </div>
                  </form>
                </CardContent>
              </InteractiveCard>
            </ScrollAnimationWrapper>
          </div>

          {/* Contact Information & More */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <ScrollAnimationWrapper animation="fadeInRight" delay={300}>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2">
                  <Globe className="w-6 h-6 animate-pulse" />
                  Contact Information
                </h3>
                
                {contactInfo.map((info, index) => (
                  <ScrollAnimationWrapper key={index} animation="fadeInUp" delay={index * 100}>
                    <InteractiveCard className="group" tiltIntensity={8}>
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center animate-levitate shadow-lg`}>
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-amber-800 mb-1">{info.title}</h4>
                            <p className="text-amber-700 font-medium mb-1">{info.content}</p>
                            <p className="text-amber-600 text-sm">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </ScrollAnimationWrapper>
                ))}
              </div>
            </ScrollAnimationWrapper>

            {/* Quick Response Times */}
            <ScrollAnimationWrapper animation="fadeInRight" delay={600}>
              <InteractiveCard className="bg-gradient-to-br from-amber-50/80 to-orange-50/80">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 animate-pulse" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-700">General Inquiries</span>
                      <Badge className="bg-green-100 text-green-800">24 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-700">Technical Support</span>
                      <Badge className="bg-blue-100 text-blue-800">2-4 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-700">Partnership Requests</span>
                      <Badge className="bg-purple-100 text-purple-800">2-3 days</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-700">Story Submissions</span>
                      <Badge className="bg-amber-100 text-amber-800">1-2 weeks</Badge>
                    </div>
                  </div>
                </CardContent>
              </InteractiveCard>
            </ScrollAnimationWrapper>

            {/* Social Links */}
            <ScrollAnimationWrapper animation="fadeInRight" delay={800}>
              <InteractiveCard>
                <CardHeader>
                  <CardTitle className="text-xl text-amber-800 flex items-center gap-2">
                    <Users className="w-5 h-5 animate-pulse" />
                    Follow Our Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {[
                      { icon: Twitter, label: "Twitter", color: "text-blue-500" },
                      { icon: Github, label: "GitHub", color: "text-gray-700" },
                      { icon: Linkedin, label: "LinkedIn", color: "text-blue-600" }
                    ].map((social, index) => (
                      <div key={index} className="relative group">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-300/50 hover:bg-amber-100/50 transition-all duration-300 hover:scale-110 relative z-10"
                        >
                          <social.icon className={`w-4 h-4 ${social.color}`} />
                        </Button>
                        <div className="absolute inset-0 bg-amber-300 rounded-lg opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </InteractiveCard>
            </ScrollAnimationWrapper>
          </div>
        </div>

        {/* Team Section */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={1000}>
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-3">
                <Users className="w-8 h-8 animate-pulse" />
                Meet Our Team
              </h2>
              <p className="text-amber-600 text-lg">
                Dedicated experts in cultural preservation and AI ethics
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <ScrollAnimationWrapper key={index} animation="rotateIn" delay={index * 200}>
                  <InteractiveCard className="text-center" tiltIntensity={10}>
                    <div className="p-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-levitate shadow-xl">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-amber-800 mb-1">{member.name}</h3>
                      <p className="text-amber-600 text-sm mb-2">{member.role}</p>
                      <p className="text-amber-700 text-xs mb-3">{member.specialty}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-300/50 text-amber-700 hover:bg-amber-100/50 transition-all duration-300 hover:scale-105"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </InteractiveCard>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* FAQ Section */}
        <ScrollAnimationWrapper animation="fadeInUp" delay={1200}>
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-3">
                <MessageCircle className="w-8 h-8 animate-pulse" />
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <ScrollAnimationWrapper key={index} animation="fadeInUp" delay={index * 150}>
                  <InteractiveCard className="h-full">
                    <div className="p-6">
                      <h4 className="font-semibold text-amber-800 mb-3 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </h4>
                      <p className="text-amber-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </InteractiveCard>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Contact;
