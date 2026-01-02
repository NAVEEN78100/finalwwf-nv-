// Card data
export const feedbackCards = [
  {
    title: "Jeton Physical Card Now Available in EU",
    subtitle: "Get your Jeton Physical Card and start making payments worldwide, both online and in-store.",
    imageUrl: "/images/feedback/feedback.jpg",
    category: "Feedback",
    contentHtml: `
      <p>We're pleased to announce that Jeton Card is now available physically for users in EU countries. This new option allows you to use your balances in more ways, both online and in-store.</p>
      
      <p>The <strong>Jeton Physical Card</strong> can be used for card payments across a wide range of merchants. You can tap to pay where contactless is accepted or link your card to <strong>Google Wallet</strong> or <strong>Apple Wallet</strong> for digital transactions via your mobile device.</p>
      
      <p>Ordering your card can be done directly through the Jeton app or from jeton.com website. Once received, you can activate it in-app, start your journey, monitor transactions in real-time, and manage your card settings securely and efficiently.</p>
      
      <p>The physical card gives users an additional way to access and use their Jeton balance, offering more flexibility in how and where payments are made—whether in person or digitally within supported regions.</p>
    `,
    publishDate: new Date()
  },
  {
    title: "Manage Over 20 Currencies with the Jeton App",
    subtitle: "Manage, exchange, and spend 20 currencies in one secure app. Jeton gives you full control of your global finances.",
    imageUrl: "/images/feedback/premium.jpg",
    category: "EarlyAccess",
    contentHtml: `
      <p><strong>Jeton Physical Card is now available to order across the EU.</strong> Check the Jeton App for availability and delivery information in your country.</p>
      
      <p>We're excited to introduce enhanced multi-currency support in the Jeton App, allowing you to manage over 20 different currencies in one secure, easy-to-use platform.</p>
      
      <p>This powerful feature gives you complete control over your global finances, whether you're traveling, doing business internationally, or simply want to diversify your currency holdings.</p>
      
      <p><strong>Key Features:</strong></p>
      <ul>
        <li>Support for 20+ major currencies</li>
        <li>Real-time exchange rates</li>
        <li>Low-cost currency conversion</li>
        <li>Instant currency switching</li>
        <li>Secure and encrypted transactions</li>
      </ul>
      
      <p>The multi-currency functionality is designed to make international transactions seamless and cost-effective, eliminating the need for multiple banking relationships or currency exchange services.</p>
      
      <p>Experience the freedom of global finance management with the enhanced Jeton App.</p>
    `,
    publishDate: new Date()
  },
  {
    title: "Introducing the Jeton Virtual Card",
    subtitle: "Discover the new Jeton Virtual Card – shop online safely without sharing your sensitive information. Order your card today through the Jeton app or website.",
    imageUrl: "/images/feedback/bugg.jpg",
    category: "BugBounty",
    contentHtml: `
      <p>We're excited to announce the launch of the <strong>Jeton Virtual Card</strong>, now available for all Jeton users!</p>
      
      <p>Designed to give you greater control, security, and convenience, the Jeton Virtual Card is the perfect solution for your online transactions.</p>
      
      <p>The Jeton Virtual Card allows you to make online purchases securely, without ever exposing your sensitive financial information. Simply generate your card, use it on websites and apps as you would a physical card, and enjoy a seamless checkout experience—all while keeping your actual account details private.</p>
      
      <p><strong>Key Security Features:</strong></p>
      <ul>
        <li>Instant card generation</li>
        <li>Enhanced fraud protection</li>
        <li>Customizable spending limits</li>
        <li>Real-time transaction notifications</li>
        <li>Easy card management through the app</li>
      </ul>
      
      <p>Whether you're shopping, subscribing, or booking services online, the Jeton Virtual Card offers a smooth and secure way to pay. It's quick to order, easy to manage and widely accepted by merchants around the world.</p>
      
      <p><strong>Order your Jeton Virtual Card today</strong> and take your online payment security to the next level.</p>
    `,
    publishDate: new Date()
  }
];

// Category display mapping
export const getCategoryDisplay = (category) => {
  switch (category) {
    case 'Feedback':
      return 'Improvements';
    case 'EarlyAccess':
      return 'New Feature';
    case 'BugBounty':
      return 'Security & Compliance';
    default:
      return 'Improvements';
  }
};

// Category class mapping
export const getCategoryClass = (category) => {
  switch (category) {
    case 'Feedback':
      return 'improvements';
    case 'EarlyAccess':
      return 'new-feature';
    case 'BugBounty':
      return 'security';
    default:
      return 'improvements';
  }
};
