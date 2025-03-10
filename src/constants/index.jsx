import { BotMessageSquare } from "lucide-react";
// import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { Wrench } from "lucide-react";
// import { PlugZap } from "lucide-react";
// import { GlobeLock } from "lucide-react";


import user1 from "../assets/profile-pictures/user1.png";
import user2 from "../assets/profile-pictures/user2.png";
import user3 from "../assets/profile-pictures/user3.png";
import user4 from "../assets/profile-pictures/user4.png";
import user5 from "../assets/profile-pictures/user5.png";
import user6 from "../assets/profile-pictures/user6.png";

const handleScroll = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};


export const navItems = [
  { label: "Home", href: "home" },
  { label: "Features", href: "features" },
  { label: "About", href: "about" },
  // { label: "Demo", href: "demo" },
];
const Navbar = () => {
  return (
    <nav>
      <ul>
        {navItems.map((item, index) => (
          <li key={index} onClick={() => handleScroll(item.href)}>
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;


export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Interactive Cipher Encryption",
    description:
      "Encrypt and decrypt messages in real-time.",
  },
  {
    icon: <Fingerprint />,
    text: "Symmetric Cipher Simulation",
    description:
      "Explore Caesar, Playfair, AES, and more.",
  },
  {
    icon: <ShieldHalf />,
    text: "Asymmetric Key Generation",
    description:
      "Generate and visualize public-private keys.",
  },
  // {
  //   icon: <Wrench/>,
  //   text: "Interactive Cipher Demonstrations ",
  //   description:
  //   "Hands-on encryption with interactive UI."
  // }
  // {
  //   icon: <
  // }
  // {
  //   icon: <BatteryCharging />,
  //   text: "Secure Communication Demo",
  //   description:
  //     "See Diffie-Hellman key exchange in action.",
  // },
  // {
  //   icon: <PlugZap />,
  //   text: "Quantum-Resistant Cryptography",
  //   description:
  //     " Learn about Crystals-Kyber security methods.",
  // },
  // {
  //   icon: <GlobeLock />,
  //   text: "Hands-on Encryption Practice",
  //   description:
  //     "Try various ciphers with live encryption.",
  // },
];
  export const Demo = [
    {
      title: "Caesar Cipher",
      videoUrl: "https://www.youtube.com/embed/JtbKh_12ctg?si=qficO8ZGkyxuSJuu",
      description: "Learn how the Caesar Cipher shifts letters for encryption.",
    },
    {
      title: "Transposition Cipher",
      videoUrl: "https://www.youtube.com/embed/cPQXaYUMOjQ?si=Oolq8qYVu8hI9VxP",
      description: "Understand the mechanics of the Transposition Cipher.",
    },
    {
      title: "Playfair Cipher",
      videoUrl: "https://www.youtube.com/embed/UURjVI5cw4g?si=YLaUWdTOV9z5uzWN",
      description: "Explore the Playfair Cipher and its encryption technique.",
    },
    {
      title: "3DES Algorithm",
      videoUrl: "https://www.youtube.com/embed/4R_kocR1roM?si=A6dSiYDMZN88NTnw",
      description: "Understand Triple DES encryption for data security.",
    },
    {
      title: "AES Encryption",
      videoUrl: "https://www.youtube.com/embed/3MPkc-PFSRI?si=HilGjy-5u0slH7oK",
      description: "Learn about the AES standard for secure encryption.",
    },
    {
      title: "RSA Encryption",
      videoUrl: "https://www.youtube.com/embed/Pq8gNbvfaoM?si=_5TV6UK_OMhaw8U8",
      description: "Discover how RSA encryption secures digital communication.",
    },
    {
      title: "ECC Cryptography",
      videoUrl: "https://www.youtube.com/embed/dCvB-mhkT0w?si=HtPGNQxKqejKADZY",
      description: "Learn about Elliptic Curve Cryptography and its applications.",
    },
    {
      title: "EDDSA Signing",
      videoUrl: "https://www.youtube.com/embed/OfnJGLiLkRk?si=OW9ZW4dVuY9Bc0_W",
      description: "Understand EDDSA and its role in digital signatures.",
    },
    {
      title: "Diffie-Hellman Key Exchange",
      videoUrl: "https://www.youtube.com/embed/pa4osob1XOk?si=A1MV47kRDFnz4Owf",
      description: "See how Diffie-Hellman allows secure key exchanges.",
    },
    {
      title: "Crystals-Kyber Post-Quantum Security",
      videoUrl: "https://www.youtube.com/embed/your-video-id10",
      description: "Explore post-quantum encryption with Crystals-Kyber.",
    }
  ];
  export const about = [
    {
      title: "About N&D-Crypt",
      description: `In today's digital world, encryption is essential for securing data and communication. N&D-Crypt is an interactive platform designed to simplify and explore the core concepts of symmetric and asymmetric encryption algorithms. Whether you're a beginner in cryptography or a tech enthusiast looking to deepen your understanding, N&D-Crypt provides an engaging, hands-on learning experience.Our platform covers essential symmetric encryption techniques, including Caesar Cipher, Transposition Cipher, Playfair Cipher, 3DES, and AES—the fundamental building blocks of modern data security. Users can input text and experience real-time encryption and decryption, helping them grasp how these algorithms function.
  On the asymmetric encryption side, N&D-Crypt features RSA, ECC, EDDSA, Diffie-Hellman, and Crystals-Kyber, vital for secure communication, digital signatures, and public-key cryptography. The platform enables users to generate public and private keys, allowing them to visualize encryption in real-world applications.At N&D-Crypt, we believe in learning by doing. Through an intuitive interface, users can explore encryption techniques, understand their mathematical foundations, and test their knowledge with interactive exercises. Whether you're looking to master basic ciphers or advanced cryptographic methods, this platform serves as a comprehensive and beginner-friendly guide to modern encryption.
  Start your cryptographic journey with N&D-Crypt and unlock the secrets of encryption! `
    }

  ]


export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
