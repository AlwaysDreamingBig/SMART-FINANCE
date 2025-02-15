import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function HomeAnimatedTestimonials() {
  const testimonials = [
    {
      quote:
        "SmartFinance3 has truly revolutionized the way we manage our finances. The seamless integration of financial tools with AI-driven fraud detection is a game-changer for our team and clients alike.",
      name: "Fang Yuan",
      designation: "CEO at SmartFinance3",
      src: "/assets/images/Fang_Yuan.jpg",
    },
    {
      quote:
        "SmartFinance3's intuitive user interface and powerful AI have drastically improved our ability to assess loan risks and detect fraudulent activity, which is crucial for both our team and our clients.",
      name: "Chris Thompson",
      designation: "Lead Risk Analyst at SmartFinance3",
      src: "/assets/images/daryl.jpg",
    },
    {
      quote:
        "Since we adopted SmartFinance3, our financial management has become more efficient, reducing operational costs and providing better insights. It's the best tool we've ever used in the finance space.",
      name: "Olivia Martinez",
      designation: "VP of Operations at SmartFinance3",
      src: "/assets/images/pasta3.jpg",
    },
    {
      quote:
        "As the CTO, I can confidently say that SmartFinance3's innovative platform has improved our loan processing efficiency and fraud detection capabilities, making a huge impact on our operations.",
      name: "Gojo Satoru",
      designation: "CTO at SmartFinance3",
      src: "/assets/images/Gojo.jpg",
    },
    {
      quote:
        "SmartFinance3's AI fraud detection has significantly decreased fraud incidents in our loan processes. The platform is incredibly efficient, and I recommend it to every financial institution.",
      name: "Ethan Carter",
      designation: "Head of Security at SmartFinance3",
      src: "/assets/images/MPOULI.jpg",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
