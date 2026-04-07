/* ===========================
   DATA
=========================== */
const dashboardData = {
  followers: 12540,
  engagement: "78%",
  growth: "+12%",
  growthData: [2000, 3500, 5200, 7800, 10200, 12540],
  posts: [
    { title: "AI Content Post",  likes: 540, comments: 120 },
    { title: "Travel Reel",      likes: 430, comments: 98  },
    { title: "Tech Tips",        likes: 390, comments: 75  },
    { title: "Motivation Post",  likes: 300, comments: 60  }
  ],
  scheduled: [
    { title: "AI Reel",        date: "Mar 30", status: "Scheduled" },
    { title: "Tech Carousel",  date: "Apr 02", status: "Draft"     },
    { title: "Travel Post",    date: "Apr 05", status: "Scheduled" },
    { title: "Product Post",   date: "Apr 08", status: "Review"    }
  ],
  platforms: [
    { name: "Instagram", value: 45 },
    { name: "YouTube",   value: 30 },
    { name: "Twitter",   value: 15 },
    { name: "LinkedIn",  value: 10 }
  ],
  monthlyEngagement: [1200, 1900, 3000, 5000, 4200, 6100]
};

/* ===========================
   THEME TOGGLE
=========================== */
function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

document.getElementById("themeToggle").onclick = () => {
  applyTheme(!document.body.classList.contains("dark"));
};

document.getElementById("themeToggle2").onclick = () => {
  applyTheme(!document.body.classList.contains("dark"));
};

/* ===========================
   SIDEBAR NAVIGATION
=========================== */
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");
const pageTitleEl = document.getElementById("pageTitle");

navItems.forEach(item => {
  item.onclick = () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    sections.forEach(sec => sec.classList.add("hidden"));
    document.getElementById(item.dataset.section).classList.remove("hidden");

    const titles = {
      overview:  "Overview",
      analytics: "Analytics",
      posts:     "Posts",
      settings:  "Settings"
    };
    pageTitleEl.textContent = titles[item.dataset.section] || "";
  };
});

/* ===========================
   OVERVIEW STATS
=========================== */
document.getElementById("followers").textContent =
  dashboardData.followers.toLocaleString();
document.getElementById("engagement").textContent = dashboardData.engagement;
document.getElementById("growth").textContent     = dashboardData.growth;

/* ===========================
   CHART HELPERS
=========================== */
const isDark = () => document.body.classList.contains("dark");

const gridColor = () => isDark()
  ? "rgba(255,255,255,0.07)"
  : "rgba(0,0,0,0.06)";

const labelColor = () => isDark() ? "#94a3b8" : "#6b7280";

Chart.defaults.font.family = "'DM Sans', sans-serif";

/* ===========================
   GROWTH CHART
=========================== */
new Chart(document.getElementById("growthChart"), {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Followers",
      data: dashboardData.growthData,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.08)",
      borderWidth: 2.5,
      pointBackgroundColor: "#3b82f6",
      pointRadius: 4,
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: gridColor() },
        ticks: { color: labelColor() }
      },
      y: {
        grid: { color: gridColor() },
        ticks: { color: labelColor() }
      }
    }
  }
});

/* ===========================
   ANALYTICS STATS
=========================== */
let totalLikes = 0, totalComments = 0;
dashboardData.posts.forEach(p => {
  totalLikes += p.likes;
  totalComments += p.comments;
});

document.getElementById("totalPosts").textContent   = dashboardData.posts.length;
document.getElementById("avgLikes").textContent     = Math.floor(totalLikes / dashboardData.posts.length);
document.getElementById("avgComments").textContent  = Math.floor(totalComments / dashboardData.posts.length);

/* ===========================
   ENGAGEMENT DOUGHNUT
=========================== */
new Chart(document.getElementById("engagementChart"), {
  type: "doughnut",
  data: {
    labels: ["Likes", "Comments"],
    datasets: [{
      data: [totalLikes, totalComments],
      backgroundColor: ["#3b82f6", "#10b981"],
      borderWidth: 0,
      hoverOffset: 6
    }]
  },
  options: {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: labelColor(), padding: 16, font: { size: 12 } }
      }
    }
  }
});

/* ===========================
   PLATFORM BAR CHART
=========================== */
new Chart(document.getElementById("platformChart"), {
  type: "bar",
  data: {
    labels: dashboardData.platforms.map(p => p.name),
    datasets: [{
      label: "Share (%)",
      data: dashboardData.platforms.map(p => p.value),
      backgroundColor: ["#3b82f6", "#ef4444", "#8b5cf6", "#10b981"],
      borderRadius: 6,
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: labelColor() }
      },
      y: {
        grid: { color: gridColor() },
        ticks: { color: labelColor() }
      }
    }
  }
});

/* ===========================
   MONTHLY ENGAGEMENT LINE
=========================== */
new Chart(document.getElementById("monthlyChart"), {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Engagement",
      data: dashboardData.monthlyEngagement,
      borderColor: "#10b981",
      backgroundColor: "rgba(16,185,129,0.08)",
      borderWidth: 2.5,
      pointBackgroundColor: "#10b981",
      pointRadius: 4,
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { color: gridColor() },
        ticks: { color: labelColor() }
      },
      y: {
        grid: { color: gridColor() },
        ticks: { color: labelColor() }
      }
    }
  }
});

/* ===========================
   TOP POSTS TABLE
=========================== */
dashboardData.posts
  .sort((a, b) => b.likes - a.likes)
  .forEach(post => {
    let perf = "low", label = "Low";
    if (post.likes > 500) { perf = "high";   label = "High";   }
    else if (post.likes > 350) { perf = "medium"; label = "Medium"; }

    document.getElementById("topPosts").innerHTML +=
      `<tr>
        <td><strong>${post.title}</strong></td>
        <td>${post.likes.toLocaleString()}</td>
        <td>${post.comments}</td>
        <td><span class="badge ${perf}">${label}</span></td>
      </tr>`;
  });

/* ===========================
   SCHEDULED POSTS
=========================== */
dashboardData.scheduled.forEach(post => {
  const statusClass = post.status.toLowerCase();
  document.getElementById("scheduledPosts").innerHTML +=
    `<div class="sched-card">
      <p class="sched-title">${post.title}</p>
      <p class="sched-date">📅 ${post.date}</p>
      <span class="sched-status ${statusClass}">${post.status}</span>
    </div>`;
});
