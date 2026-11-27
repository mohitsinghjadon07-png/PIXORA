 
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:080808,50:29221A,100:C5A46D&height=220&section=header&text=PIXORA&fontSize=85&fontColor=F5EBDD&animation=fadeIn&fontAlignY=38&desc=YOUR%20WORLD.%20YOUR%20FRAMES.&descAlignY=58&descSize=18" width="100%" />

<img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=500&size=22&duration=3000&pause=1000&color=C5A46D&center=true&vCenter=true&width=650&lines=A+Cinematic+3D+Photography+Experience;Built+with+React+%7C+Three.js+%7C+AWS;Capture.+Explore.+Experience." alt="Animated typing introduction" />

<br/>

[![Live on AWS](https://img.shields.io/badge/LIVE%20ON-AWS%20S3-C5A46D?style=for-the-badge&logo=amazons3&logoColor=white)](http://pixora-mohit-jadon-2026.s3-website.ap-south-1.amazonaws.com/)
[![GitHub Pages](https://img.shields.io/badge/LIVE%20ON-GITHUB%20PAGES-181717?style=for-the-badge&logo=github&logoColor=white)](https://mohitsinghjadon07-png.github.io/PIXORA/)
[![Repository](https://img.shields.io/badge/SOURCE%20CODE-GITHUB-333333?style=for-the-badge&logo=github)](https://github.com/mohitsinghjadon07-png/PIXORA)

<br/>

**A cinematic photography gallery built to make every photograph feel like an experience.**

</div>

---

## ✦ About PIXORA

PIXORA is a cinematic, interactive photography gallery that combines modern web technologies with immersive 3D visuals and smooth motion effects.

Designed around a dark, editorial aesthetic, PIXORA transforms a traditional photo gallery into a visually engaging experience.

The project also demonstrates cloud deployment using **Amazon Web Services (AWS) S3** alongside GitHub Pages.

## ✨ Features

| Feature | Description |
|---|---|
| 3D Visual Experience | Floating 3D photography elements |
| Cinematic Interface | Dark luxury-inspired visual design |
| Smooth Animations | Motion effects and interactive transitions |
| Interactive Gallery | Explore and interact with photographs |
| Image Upload Preview | Select and preview images locally |
| Responsive Design | Designed for different screen sizes |
| Lightbox Experience | View photographs in an expanded view |
| Dual Deployment | Hosted on GitHub Pages and AWS S3 |

> **Note:** Image uploads currently provide local browser previews. Permanent cloud storage for visitor-uploaded photographs is not implemented yet.

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D_Graphics-black?style=for-the-badge&logo=threedotjs&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![AWS S3](https://img.shields.io/badge/Amazon_S3-Cloud_Hosting-569A31?style=for-the-badge&logo=amazons3&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployment-222222?style=for-the-badge&logo=github&logoColor=white)

</div>

## 🏗️ Architecture

PIXORA uses a React-based frontend, built with Vite and deployed to two hosting platforms.

```mermaid
flowchart TD
    A["👤 Visitor"] --> B["🌐 PIXORA Website"]
    B --> C["⚛️ React Application"]
    C --> D["🎨 Three.js / React Three Fiber"]
    C --> E["✨ Framer Motion"]
    C --> F["🖼️ Interactive Gallery"]
    B --> G["☁️ Deployment"]
    G --> H["GitHub Pages"]
    G --> I["Amazon S3"]
```

### AWS Deployment

The production build is hosted in an Amazon S3 bucket configured for static website hosting.

**AWS Configuration**

| Component | Configuration |
|---|---|
| Cloud Provider | Amazon Web Services |
| Storage Service | Amazon S3 |
| Bucket | `pixora-mohit-jadon-2026` |
| AWS Region | Asia Pacific (Mumbai) |
| Region Code | `ap-south-1` |
| Hosting | S3 Static Website Hosting |
| Access | Public read for website objects |
| Entry Document | `index.html` |

### Deployment Flow

```text
React Source Code
       |
       ▼
    Vite Build
       |
       ▼
 Production Files
       |
       ▼
   index.html
   assets/
       |
       ▼
   Amazon S3
       |
       ▼
  Static Website
```

## 🚀 Live Deployments

<div align="center">

### ☁️ AWS S3 Deployment

[![AWS Deployment](https://img.shields.io/badge/OPEN%20PIXORA-AWS%20S3-C5A46D?style=for-the-badge&logo=amazonaws&logoColor=white)](http://pixora-mohit-jadon-2026.s3-website.ap-south-1.amazonaws.com/)

`http://pixora-mohit-jadon-2026.s3-website.ap-south-1.amazonaws.com/`

### 🐙 GitHub Pages Deployment

[![GitHub Deployment](https://img.shields.io/badge/OPEN%20PIXORA-GITHUB%20PAGES-24292F?style=for-the-badge&logo=github&logoColor=white)](https://mohitsinghjadon07-png.github.io/PIXORA/)

`https://mohitsinghjadon07-png.github.io/PIXORA/`

### 💻 Source Code

[![GitHub Repository](https://img.shields.io/badge/VIEW%20SOURCE%20CODE-PIXORA-181717?style=for-the-badge&logo=github)](https://github.com/mohitsinghjadon07-png/PIXORA)

</div>

## ⚙️ Run Locally

Want to explore the project on your own machine?

**1. Clone the repository**

```bash
git clone https://github.com/mohitsinghjadon07-png/PIXORA.git
```

**2. Enter the project directory**

```bash
cd PIXORA
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Create a production build**

```bash
npm run build
```

The production-ready files will be generated inside the `dist/` directory.

## 📁 Project Structure

```text
PIXORA/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Hero3D.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Project Objectives

- Explore immersive 3D experiences in modern web development.
- Build interactive interfaces using React.
- Integrate animation into a photography-focused experience.
- Understand production builds and static website hosting.
- Gain practical experience with AWS S3 cloud deployment.
- Deploy and maintain a project across multiple platforms.

## 🔮 Future Improvements

- Permanent image uploads using Amazon S3.
- Secure upload handling through presigned URLs.
- User authentication and personal galleries.
- Image collections and cloud-backed storage.
- CloudFront CDN integration for HTTPS and improved content delivery.

## 👨‍💻 Developer

<div align="center">

### MOHIT JADON

**Cyber Security Student | Developer | Cloud Learner**

Building projects at the intersection of technology, creativity and real-world applications.

[![GitHub](https://img.shields.io/badge/GitHub-MohitSinghJadon07-181717?style=for-the-badge&logo=github)](https://github.com/mohitsinghjadon07-png)

</div>

---

<div align="center">

**PIXORA — YOUR WORLD. YOUR FRAMES.**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:C5A46D,50:29221A,100:080808&height=120&section=footer" width="100%" />

<sub>Designed and developed with curiosity and code.</sub>

</div>
