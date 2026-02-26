const Portfolio = () => {
  const portfolioItems = [
    {
      title: "Curtain Wall Systems",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6c4mOy_2rshUO9pqpOOw-_UZhJfLLUZVaVFWc0ohSg0_VoPgf646AH9WzvvdZ_zuvm6zBLU4o084g_pfAA6eeZcSvCsblWfEKrxdD7Kku5SgpjU9yyINspFT-K-AfXzeyiFUNR46fZUhhvx3sfjJR-bF5SNTD08CUpY8T_mLKOd7xNBRgo5CHAQdX9TNOHRu7zAFwMDdRuFekGhJf-ZnDuLkth4iPvWonLdgY9Rs-eTV7nOMH1x4JMSjRvpYHK8k_wwnltEhysZk"
    },
    {
      title: "Minimal Sliding Doors",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7Cm1pMc_55CGJu5ayOrPq0iTImpCk25xN0ZeiKTHzZ5kZjIoxrvN6CGH8VkU4tHu5wIhR8wYTOSh-jdbYS9o5VXfgTkTHpPVQ5Eg6clEgsh4PbKAreaMC8TaQRh_2_5eKlmJqgu4sa5Ca4eHjbvW2ITeA0RxxPBurjT5LUPHC_IRoO-lmHUja8C6OhMkVJ1ptGRcyChm8Ib12Meka9Cfp0Pc3HP2euDvVXUQN907eRVNYp4CMmlRp2L2KkXW79gGxmmseAl3swRA"
    },
    {
      title: "Performance Louvres",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlG3bMFVKZn2b_U4xZUONNw0-LT3Oxt0zLCb9bLfNw9DEthGsJn6aaCbmFf4DUkv4MHAZt5nzC1zwHlSZWrcoHEEdj8K9UwmINf4Lqdg5UKqi59dchNKQedhydNfRusbNrpBhO9om1lQPv1bL6leqzGSLB26cUxqCZKrEDHJswkGFirQrk24mKQ90tGd7BWRj3W-49lfa4FkmQx7gBywNRekjnHPWPnjldmHkyGOLiEz59pYt1hVaAS5euwIWTE3VfsFHMNGvmFZA"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
          Our Product Portfolio
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mb-12"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl border border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Metallic shine overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              {/* Image container with inner border */}
              <div className="relative m-1 rounded-xl overflow-hidden border border-gray-300 bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Title with metallic underline */}
              <div className="p-5">
                <h4 className="text-xl font-semibold text-gray-800 relative inline-block">
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-gray-600 to-gray-400 group-hover:w-full transition-all duration-300"></span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;