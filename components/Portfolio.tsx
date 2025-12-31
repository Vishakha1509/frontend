"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio } from "@/lib/api";
import type { Portfolio as PortfolioType } from "@/lib/api";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Map portfolio titles to image filenames in /public/portfolio/
const portfolioImages: { [key: string]: string } = {
  "anubhuti donation management software": "/portfolio/Donation-Management.png",
  "career & job opportunity portal": "/portfolio/job-portal.jpg",
  "web development": "/portfolio/web-development.png",
  "course selling website": "/portfolio/course-selling-website.png",
  "registrar panel": "/portfolio/registrar-panel.png",
  "food deals": "/portfolio/food-deals.png",
};

// Function to get local image path
const getLocalImagePath = (title: string): string | null => {
  if (!title) return null;
  const titleLower = title.toLowerCase().trim();

  // Direct match
  if (portfolioImages[titleLower]) {
    return portfolioImages[titleLower];
  }

  // Try partial match for variations
  for (const [key, path] of Object.entries(portfolioImages)) {
    if (titleLower.includes(key) || key.includes(titleLower)) {
      return path;
    }
  }

  return null;
};

// Gradient colors for different categories
const getCategoryGradient = (
  title: string,
  category: string
): { gradient: string; pattern: string } => {
  const titleLower = (title || "").toLowerCase();
  const categoryLower = (category || "").toLowerCase();

  if (
    titleLower.includes("digital marketing") ||
    titleLower.includes("marketing") ||
    categoryLower.includes("marketing")
  ) {
    return {
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      pattern: "📊",
    };
  }
  if (
    titleLower.includes("e-commerce") ||
    titleLower.includes("ecommerce") ||
    titleLower.includes("shop")
  ) {
    return {
      gradient: "from-orange-500 via-red-500 to-pink-500",
      pattern: "🛒",
    };
  }
  if (titleLower.includes("restaurant") || titleLower.includes("food")) {
    return {
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      pattern: "🍽️",
    };
  }
  if (titleLower.includes("portfolio") || titleLower.includes("personal")) {
    return {
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      pattern: "💼",
    };
  }
  if (titleLower.includes("real estate") || titleLower.includes("property")) {
    return {
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      pattern: "🏠",
    };
  }
  if (
    titleLower.includes("healthcare") ||
    titleLower.includes("medical") ||
    titleLower.includes("hospital")
  ) {
    return {
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      pattern: "🏥",
    };
  }
  if (
    titleLower.includes("education") ||
    titleLower.includes("school") ||
    titleLower.includes("course") ||
    titleLower.includes("learning")
  ) {
    return {
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      pattern: "📚",
    };
  }
  if (
    titleLower.includes("fitness") ||
    titleLower.includes("gym") ||
    titleLower.includes("health")
  ) {
    return {
      gradient: "from-red-500 via-orange-500 to-yellow-500",
      pattern: "💪",
    };
  }
  if (
    titleLower.includes("travel") ||
    titleLower.includes("tourism") ||
    titleLower.includes("hotel")
  ) {
    return {
      gradient: "from-sky-500 via-blue-500 to-indigo-500",
      pattern: "✈️",
    };
  }
  if (titleLower.includes("app") || titleLower.includes("mobile")) {
    return {
      gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
      pattern: "📱",
    };
  }
  if (
    titleLower.includes("registrar") ||
    titleLower.includes("panel") ||
    titleLower.includes("dashboard")
  ) {
    return {
      gradient: "from-slate-600 via-gray-600 to-zinc-600",
      pattern: "⚙️",
    };
  }
  if (
    categoryLower.includes("web development") ||
    categoryLower.includes("website")
  ) {
    return {
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      pattern: "💻",
    };
  }
  if (categoryLower.includes("digital marketing")) {
    return {
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      pattern: "📈",
    };
  }
  if (
    categoryLower.includes("ui") ||
    categoryLower.includes("ux") ||
    categoryLower.includes("design")
  ) {
    return { gradient: "from-pink-500 via-rose-500 to-red-500", pattern: "🎨" };
  }
  if (categoryLower.includes("seo")) {
    return {
      gradient: "from-green-600 via-emerald-600 to-teal-600",
      pattern: "🔍",
    };
  }

  return {
    gradient: "from-purple-600 via-pink-600 to-blue-600",
    pattern: "🌐",
  };
};

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioType | null>(null);

  useEffect(() => {
    fetchPortfolio()
      .then((data) => {
        if (Array.isArray(data)) {
          setPortfolio(data);
        } else if (data && typeof data === "object") {
          const paginatedData = data as { results?: PortfolioType[] };
          if (Array.isArray(paginatedData.results)) {
            setPortfolio(paginatedData.results);
          } else {
            setPortfolio([]);
          }
        } else {
          setPortfolio([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching portfolio:", error);
        setPortfolio([]);
      });
  }, []);

  const categories = [
    "all",
    ...Array.from(
      new Set(portfolio.map((item) => item.category || "Uncategorized"))
    ),
  ];
  const filteredPortfolio =
    selectedCategory === "all"
      ? portfolio
      : portfolio.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="py-32 bg-slate-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm text-purple-300 rounded-full text-sm font-semibold mb-4 border border-purple-500/30"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Our Work
          </motion.span>

          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20 border border-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        {filteredPortfolio.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white/50 text-lg">
              No portfolio items available
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredPortfolio.map((item, index) => {
                const { gradient, pattern } = getCategoryGradient(
                  item.title || "",
                  item.category || ""
                );
                const localImagePath = getLocalImagePath(item.title || "");
                const hasRealImage =
                  localImagePath ||
                  (item.image_url && item.image_url.trim() !== "");
                const imageSrc = localImagePath || item.image_url || "";

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <motion.div
                      className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 cursor-pointer h-80"
                      whileHover={{ y: -10 }}
                      onClick={() => setSelectedItem(item)}
                    >
                      {/* Full height Image/Gradient Container */}
                      <div className="absolute inset-0 overflow-hidden">
                        {hasRealImage && imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={item.title || "Portfolio item"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            unoptimized={imageSrc.startsWith("/portfolio/")}
                            onError={(e) => {
                              console.error("Image failed to load:", imageSrc);
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          // Beautiful gradient placeholder
                          <div
                            className={`h-full w-full bg-gradient-to-br ${gradient} relative overflow-hidden`}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20"
                              animate={{ opacity: [0.5, 0.8, 0.5] }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')]"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                className="text-6xl opacity-20"
                                animate={{
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                {pattern}
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Category badge - Always visible */}
                      <motion.div
                        className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-purple-600 z-20"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {item.category || "Uncategorized"}
                      </motion.div>

                      {/* Sliding Text Overlay - Appears on hover */}
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end z-10"
                        initial={false}
                      >
                        {/* Gradient overlay for text readability */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-800/70 to-slate-700/30"
                          initial={{ opacity: 0.6 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Text Content - Slides up on hover */}
                        <motion.div className="relative p-6 translate-y-[calc(100%-4rem)] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          {/* Title - Always visible at bottom */}
                          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                            {item.title || "Untitled"}
                          </h3>

                          {/* Description - Hidden, slides in on hover */}
                          <motion.p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                            {item.description || "No description available"}
                          </motion.p>

                          {/* View Project Link - Hidden, slides in on hover */}
                          {item.link && (
                            <motion.a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Project
                              <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            </motion.a>
                          )}
                        </motion.div>
                      </motion.div>

                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-30"
                        style={{
                          background:
                            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                          backgroundSize: "200% 200%",
                        }}
                        animate={{
                          backgroundPosition: ["200% 0%", "-200% 0%"],
                        }}
                        transition={{ duration: 1.5, ease: "linear" }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal for item details */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/10"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {getLocalImagePath(selectedItem.title || "") ||
              selectedItem.image_url ? (
                <div className="relative h-96 w-full">
                  <Image
                    src={
                      getLocalImagePath(selectedItem.title || "") ||
                      selectedItem.image_url ||
                      ""
                    }
                    alt={selectedItem.title || "Portfolio item"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className={`h-96 w-full bg-gradient-to-br ${
                    getCategoryGradient(
                      selectedItem.title || "",
                      selectedItem.category || ""
                    ).gradient
                  } flex items-center justify-center`}
                >
                  <span className="text-8xl opacity-30">
                    {
                      getCategoryGradient(
                        selectedItem.title || "",
                        selectedItem.category || ""
                      ).pattern
                    }
                  </span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-white/70 mb-6">{selectedItem.description}</p>
                {selectedItem.link && (
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Visit Project
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
