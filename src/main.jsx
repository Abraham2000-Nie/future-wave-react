import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './base.css';

const routes = [
  { path: '/', html: '/original/index1.html', css: ['/original/css1/style1.css'], ns: 'root', scripts: ['/original/js1/index1.js'] },
  { path: '/user/dashboard', html: '/original/user/dashboard.html', css: ['/original/user/css/dashboard.css'], ns: 'user', scripts: ['/original/user/js/dashboard.js'] },
  { path: '/user/place', html: '/original/user/place.html', css: ['/original/user/css/place.css'], ns: 'user', scripts: ['/original/user/js/place.js'] },
  { path: '/user/about', html: '/original/user/about.html', css: ['/original/user/css/about.css'], ns: 'user', scripts: ['/original/user/js/about.js'] },
  { path: '/user/feedback', html: '/original/user/feedback.html', css: ['/original/user/css/feedback.css'], ns: 'user', scripts: ['/original/user/js/feedback.js'] },
  { path: '/user/report', html: '/original/user/report.html', css: ['/original/user/css/report.css'], ns: 'user', scripts: ['/original/user/js/report.js'] },
  { path: '/user/movies', html: '/original/user/movies.html', css: ['/original/user/css/movies.css'], ns: 'user', scripts: ['/original/user/js/movies.js', '/original/user/js/report.js'] },
  { path: '/user/resorts', html: '/original/user/resorts.html', css: ['/original/user/css/resorts.css'], ns: 'user', scripts: ['/original/user/js/resorts.js', '/original/user/js/report.js'] },
  { path: '/user/vehicles', html: '/original/user/vehicles.html', css: ['/original/user/css/vehicles.css'], ns: 'user', scripts: ['/original/user/js/vehicles.js', '/original/user/js/report.js'] },
  { path: '/user/electronics', html: '/original/user/electronics.html', css: ['/original/user/css/electronics.css'], ns: 'user', scripts: ['/original/user/js/electronics.js', '/original/user/js/report.js'] },
  { path: '/user/properties', html: '/original/user/properties.html', css: ['/original/user/css/properties.css'], ns: 'user', scripts: ['/original/user/js/properties.js', '/original/user/js/report.js'] },
  { path: '/user/eateries', html: '/original/user/eateries.html', css: ['/original/user/css/eateries.css'], ns: 'user', scripts: ['/original/user/js/eateries.js', '/original/user/js/report.js'] },
  { path: '/admin/dashboard', html: '/original/admin/admin-dashboard.html', css: ['/original/admin/admin-css/admin-dashboard.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-dashboard.js'] },
  { path: '/admin/about', html: '/original/admin/admin-about.html', css: ['/original/admin/admin-css/admin-about.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-about.js'] },
  { path: '/admin/place', html: '/original/admin/admin-place.html', css: ['/original/admin/admin-css/admin-place.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-place.js'] },
  { path: '/admin/feedback', html: '/original/admin/admin-feedback.html', css: ['/original/admin/admin-css/admin-feedback.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-feedback.js'] },
  { path: '/admin/report', html: '/original/admin/admin-report.html', css: ['/original/admin/admin-css/admin-report.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-report.js'] },
  { path: '/admin/movies', html: '/original/admin/admin-movies.html', css: ['/original/admin/admin-css/admin-movies.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-movies.js'] },
  { path: '/admin/resorts', html: '/original/admin/admin-resorts.html', css: ['/original/admin/admin-css/admin-resorts.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-resorts.js'] },
  { path: '/admin/vehicles', html: '/original/admin/admin-vehicles.html', css: ['/original/admin/admin-css/admin-vehicles.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-vehicles.js'] },
  { path: '/admin/electronics', html: '/original/admin/admin-electronics.html', css: ['/original/admin/admin-css/admin-electronics.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-electronics.js'] },
  { path: '/admin/properties', html: '/original/admin/admin-properties.html', css: ['/original/admin/admin-css/admin-properties.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-properties.js'] },
  { path: '/admin/eateries', html: '/original/admin/admin-eateries.html', css: ['/original/admin/admin-css/admin-eateries.css'], ns: 'admin', scripts: ['/original/admin/admin-js/admin-eateries.js'] }
];

const defaultPlaces = ['Bangalore', 'Mysore', 'Hyderabad', 'Chennai', 'Mumbai', 'Pune'];

function initializeStorage() {
  if (!localStorage.getItem('places')) {
    localStorage.setItem('places', JSON.stringify(defaultPlaces));
  }
  const detailedAbout = 'Future Wave is a complete city guide designed to help users explore useful information across movies, holiday centers, automobiles, electronics, properties, and eateries. It brings travel planning and local discovery into one simple platform, allowing users to select their preferred city and view relevant options for that location. The project provides an easy-to-use dashboard, clear navigation, and regularly organized listings so visitors can quickly find entertainment, accommodation, shopping, dining, and property information. Administrators can also manage places and update section content, keeping the platform useful, accurate, and current. Future Wave aims to make local discovery convenient, informative, and accessible for every user.';
  const currentAbout = localStorage.getItem('aboutContent');
  if (!currentAbout || currentAbout === 'Welcome to Future Wave Project!' || currentAbout === 'Default about content...') {
    localStorage.setItem('aboutContent', detailedAbout);
  }

  const ensureData = (key, data) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  ensureData('moviesData', {
    Bangalore: [
      { name: 'KGF Chapter 2', desc: 'Action blockbuster', date: '14 Apr 2022' },
      { name: 'Kantara', desc: 'Folk action drama', date: '30 Sep 2022' },
      { name: 'Charlie 777', desc: 'Emotional adventure film', date: '10 Jun 2022' }
    ],
    Mysore: [
      { name: 'Kirik Party', desc: 'College life entertainer', date: '30 Dec 2016' },
      { name: 'Yuvarathnaa', desc: 'Action drama', date: '01 Apr 2021' },
      { name: 'James', desc: 'Power-packed action movie', date: '17 Mar 2022' }
    ],
    Hyderabad: [
      { name: 'Baahubali 2', desc: 'Epic action drama', date: '28 Apr 2017' },
      { name: 'Pushpa', desc: 'Action thriller', date: '17 Dec 2021' },
      { name: 'RRR', desc: 'Action drama', date: '25 Mar 2022' }
    ],
    Chennai: [
      { name: 'Vikram', desc: 'Action thriller', date: '03 Jun 2022' },
      { name: 'Master', desc: 'Mass action drama', date: '13 Jan 2021' },
      { name: 'Leo', desc: 'Stylish action thriller', date: '19 Oct 2023' }
    ],
    Mumbai: [
      { name: 'Pathaan', desc: 'Spy action thriller', date: '25 Jan 2023' },
      { name: 'Jawan', desc: 'Mass action entertainer', date: '07 Sep 2023' },
      { name: 'Animal', desc: 'Intense crime drama', date: '01 Dec 2023' }
    ],
    Pune: [
      { name: '3 Idiots', desc: 'College life drama', date: '25 Dec 2009' },
      { name: 'Sita Ramam', desc: 'Romantic war drama', date: '05 Aug 2022' },
      { name: 'Andhadhun', desc: 'Crime thriller', date: '05 Oct 2018' }
    ]
  });

  ensureData('resortsData', {
    Bangalore: [{ name: 'Golden Palm Resort', desc: 'Luxury nature retreat', date: '15 Jan 2022' }, { name: 'Palm Meadows', desc: 'Premium leisure resort', date: '10 Mar 2021' }, { name: 'Clarks Exotica', desc: 'Hilltop luxury resort', date: '05 Aug 2020' }],
    Mysore: [{ name: 'Silent Shores', desc: 'Lake-side luxury resort', date: '10 Oct 2020' }, { name: 'Country Inn', desc: 'Family-friendly holiday stay', date: '15 Mar 2019' }, { name: 'Royal Orchid', desc: 'Elegant city resort', date: '01 Jan 2021' }],
    Hyderabad: [{ name: 'Palm Exotica', desc: 'Premium lakeside resort', date: '12 Feb 2021' }, { name: 'Trident Hyderabad', desc: 'Luxury city resort', date: '20 Aug 2019' }, { name: 'Lahari Resorts', desc: 'Family holiday destination', date: '05 Jun 2018' }],
    Chennai: [{ name: 'Radisson Blu', desc: 'Beachside luxury resort', date: '25 May 2020' }, { name: 'InterContinental', desc: 'Premium sea-view stay', date: '12 Dec 2019' }, { name: 'Ideal Beach Resort', desc: 'Relaxing coastal retreat', date: '08 Jul 2018' }],
    Mumbai: [{ name: 'The Resort Madh Island', desc: 'Beachfront holiday resort', date: '14 Feb 2019' }, { name: 'Fariyas Resort', desc: 'Luxury hill resort', date: '20 Aug 2020' }, { name: 'Eskay Resort', desc: 'Nature & spa retreat', date: '05 Jun 2018' }],
    Pune: [{ name: 'Atmantan Wellness', desc: 'Luxury wellness retreat', date: '10 Jan 2021' }, { name: 'Malhar Machi', desc: 'Eco-friendly hill resort', date: '18 Sep 2019' }, { name: 'Jalsrushti', desc: 'Lakeside eco resort', date: '22 Apr 2020' }]
  });

  ensureData('vehiclesData', {
    Bangalore: [{ name: 'Honda City 2023', desc: 'Sedan - Petrol', date: 'Launched: 10 Jan 2023' }, { name: 'Hyundai Creta', desc: 'SUV - Diesel', date: 'Launched: 20 Feb 2022' }, { name: 'Royal Enfield Classic 350', desc: 'Bike - 350cc', date: 'Launched: 05 Aug 2021' }],
    Mysore: [{ name: 'Tata Nexon', desc: 'Compact SUV - Petrol', date: 'Launched: 15 Mar 2023' }, { name: 'TVS Apache RTR', desc: 'Bike - 200cc', date: 'Launched: 12 Jul 2022' }, { name: 'Mahindra Thar', desc: 'Off-road SUV', date: 'Launched: 01 Jan 2021' }],
    Hyderabad: [{ name: 'Mahindra XUV700', desc: 'Premium SUV', date: 'Launched: 08 Aug 2021' }, { name: 'Toyota Fortuner', desc: 'Full-size SUV', date: 'Launched: 06 Jan 2021' }, { name: 'Royal Enfield Hunter 350', desc: 'Modern roadster', date: 'Launched: 06 Aug 2022' }],
    Chennai: [{ name: 'Kia Seltos', desc: 'SUV - Diesel', date: 'Launched: 11 Nov 2022' }, { name: 'Bajaj Pulsar NS200', desc: 'Bike - Sports', date: 'Launched: 18 Jun 2021' }, { name: 'Toyota Innova Crysta', desc: 'Premium MPV', date: 'Launched: 02 Apr 2020' }],
    Mumbai: [{ name: 'Maruti Swift', desc: 'Hatchback - Petrol', date: 'Launched: 25 Jan 2023' }, { name: 'Yamaha R15', desc: 'Bike - 155cc', date: 'Launched: 07 Sep 2022' }, { name: 'BMW X1', desc: 'Luxury SUV', date: 'Launched: 19 Oct 2021' }],
    Pune: [{ name: 'Skoda Slavia', desc: 'Premium Sedan', date: 'Launched: 05 Dec 2022' }, { name: 'KTM Duke 390', desc: 'Sports Bike', date: 'Launched: 10 Aug 2021' }, { name: 'Jeep Compass', desc: 'Off-road SUV', date: 'Launched: 30 May 2020' }]
  });

  ensureData('electronicsData', {
    Bangalore: [{ name: 'iPhone 15', desc: 'Apple Smartphone', date: 'Launched: 12 Sep 2023' }, { name: 'Samsung Galaxy S23', desc: 'Android Flagship', date: 'Launched: 01 Feb 2023' }, { name: 'Sony Bravia TV', desc: '4K Smart TV', date: 'Launched: 15 Mar 2022' }],
    Mysore: [{ name: 'Dell Inspiron Laptop', desc: 'Core i5 Laptop', date: 'Launched: 20 Jun 2022' }, { name: 'Boat Airpods', desc: 'Wireless Earbuds', date: 'Launched: 10 Jan 2023' }, { name: 'Canon DSLR Camera', desc: 'Professional Camera', date: 'Launched: 18 Aug 2021' }],
    Hyderabad: [{ name: 'HP Spectre Laptop', desc: 'Premium Windows Laptop', date: 'Launched: 18 Aug 2022' }, { name: 'Samsung Galaxy Z Flip', desc: 'Foldable Smartphone', date: 'Launched: 10 Aug 2022' }, { name: 'Sony WH-1000XM5', desc: 'Noise-cancelling headphones', date: 'Launched: 18 May 2022' }],
    Chennai: [{ name: 'HP Pavilion Laptop', desc: 'Gaming Laptop', date: 'Launched: 25 Nov 2022' }, { name: 'OnePlus Nord', desc: 'Midrange Smartphone', date: 'Launched: 12 Apr 2023' }, { name: 'LG Refrigerator', desc: 'Double Door Fridge', date: 'Launched: 05 May 2021' }],
    Mumbai: [{ name: 'MacBook Air M2', desc: 'Apple Laptop', date: 'Launched: 10 Jul 2022' }, { name: 'JBL Bluetooth Speaker', desc: 'Portable Speaker', date: 'Launched: 14 Feb 2023' }, { name: 'PlayStation 5', desc: 'Gaming Console', date: 'Launched: 01 Dec 2021' }],
    Pune: [{ name: 'Realme Smart TV', desc: 'Android Smart TV', date: 'Launched: 22 Mar 2022' }, { name: 'Asus Gaming Laptop', desc: 'ROG Series', date: 'Launched: 30 Oct 2022' }, { name: 'Mi Smart Watch', desc: 'Fitness Tracker', date: 'Launched: 12 Jan 2023' }]
  });

  ensureData('propertiesData', {
    Bangalore: [{ name: 'Prestige Lakeside', desc: 'Luxury apartment project', date: '12 Feb 2022' }, { name: 'Brigade Meadows', desc: 'Premium residential flats', date: '05 Jun 2021' }, { name: 'Sobha City', desc: 'Modern housing community', date: '18 Aug 2020' }],
    Mysore: [{ name: 'Sankalp Central Park', desc: 'Affordable housing project', date: '22 Mar 2021' }, { name: 'GSS Meadows', desc: 'Family friendly apartments', date: '10 Jan 2020' }, { name: 'Premier Residency', desc: 'City center properties', date: '15 Jul 2019' }],
    Hyderabad: [{ name: 'My Home Bhooja', desc: 'Luxury residential apartments', date: '14 Mar 2021' }, { name: 'Aparna Sarovar', desc: 'Premium gated community', date: '08 Oct 2020' }, { name: 'Rajapushpa Provincia', desc: 'Modern housing project', date: '21 Jun 2019' }],
    Chennai: [{ name: 'TVH Quadrant', desc: 'Premium apartments', date: '30 Apr 2021' }, { name: 'DLF Garden City', desc: 'Luxury gated community', date: '14 Nov 2020' }, { name: 'Casagrand Boulevard', desc: 'Modern residential homes', date: '05 Sep 2019' }],
    Mumbai: [{ name: 'Lodha World Towers', desc: 'Ultra luxury flats', date: '01 Jan 2022' }, { name: 'Hiranandani Estate', desc: 'High class township', date: '18 Aug 2020' }, { name: 'Godrej Properties', desc: 'Modern housing project', date: '07 Mar 2021' }],
    Pune: [{ name: 'Amanora Park Town', desc: 'Premium township', date: '20 Feb 2021' }, { name: 'Magarpatta City', desc: 'Integrated housing project', date: '12 Dec 2019' }, { name: 'Kolte Patil Life Republic', desc: 'Smart city homes', date: '03 Jun 2020' }]
  });

  ensureData('eateriesData', {
    Bangalore: [{ name: 'Empire Restaurant', desc: 'Famous for biryani and grills', date: 'Established 1966' }, { name: 'CTR Malleshwaram', desc: 'Iconic dosa and filter coffee', date: 'Established 1950' }, { name: 'Meghana Foods', desc: 'Popular Andhra style food', date: 'Established 2006' }],
    Mysore: [{ name: 'RRR Restaurant', desc: 'Traditional non-veg meals', date: 'Established 1982' }, { name: 'Hotel Mylari', desc: 'World famous soft dosas', date: 'Established 1938' }, { name: 'Depth N Green', desc: 'Healthy vegetarian cafe', date: 'Established 2015' }],
    Hyderabad: [{ name: 'Paradise', desc: 'Famous Hyderabadi biryani', date: 'Established 1953' }, { name: 'Chutneys', desc: 'South Indian restaurant', date: 'Established 1986' }, { name: 'Cafe Bahar', desc: 'Popular local dining spot', date: 'Established 1973' }],
    Chennai: [{ name: 'Saravana Bhavan', desc: 'Legendary South Indian chain', date: 'Established 1981' }, { name: 'Murugan Idli Shop', desc: 'Authentic idli varieties', date: 'Established 1993' }, { name: 'Annalakshmi', desc: 'Fine dining vegetarian', date: 'Established 1984' }],
    Mumbai: [{ name: 'Leopold Cafe', desc: 'Historic cafe at Colaba', date: 'Established 1871' }, { name: 'Britannia & Co', desc: 'Famous Parsi restaurant', date: 'Established 1923' }, { name: 'Bademiya', desc: 'Popular late-night food spot', date: 'Established 1946' }],
    Pune: [{ name: 'Vaishali', desc: 'Most loved breakfast place', date: 'Established 1951' }, { name: 'German Bakery', desc: 'Iconic bakery and cafe', date: 'Established 1988' }, { name: 'Marz-O-Rin', desc: 'Famous sandwiches and shakes', date: 'Established 1965' }]
  });
}

initializeStorage();

function mapPageUrl(value, ns) {
  if (!value) return '/';
  let clean = value.trim();
  if (clean.startsWith('/')) return clean;
  clean = clean.replace(/^\.?\//, '');
  if (clean === '../index1.html' || clean === 'index1.html') return '/';
  let pageNamespace = ns;
  if (clean.startsWith('../')) {
    clean = clean.slice(3);
    pageNamespace = 'root';
  } else if (clean.startsWith('user/')) {
    clean = clean.slice(5);
    pageNamespace = 'user';
  } else if (clean.startsWith('admin/')) {
    clean = clean.slice(6);
    pageNamespace = 'admin';
  }
  const queryIndex = clean.indexOf('?');
  const suffix = queryIndex >= 0 ? clean.slice(queryIndex) : '';
  clean = clean.replace(/\.html.*$/, '').replace(/\.html$/, '');
  if (clean === 'admin-login') return '/admin/dashboard';
  if (clean === 'index') return '/';
  if (clean.startsWith('admin-')) {
    const name = clean.slice(6);
    return name === 'login' ? '/admin/dashboard' : `/admin/${name}${suffix}`;
  }
  if (pageNamespace === 'admin') return `/admin/${clean}${suffix}`;
  if (pageNamespace === 'user') return `/user/${clean}${suffix}`;
  if (clean.includes('dashboard')) return '/user/dashboard';
  return `/${clean}${suffix}`;
}

function transformScript(source, ns) {
  let output = source;
  output = output.replace(/(["'])([^"']*\.html(?:\?[^"']*)?)\1/g, (_, quote, value) => `${quote}${mapPageUrl(value, ns)}${quote}`);
  output = output.replace(/window\.location\.href\s*=\s*(["'])([^"']*)\1\s*;?/g,
    (_, quote, value) => `window.location.href = ${quote}${mapPageUrl(value, ns)}${quote};`);
  output = output.replace(/window\.location\.href\s*=\s*page\s*;?/g,
    'window.location.href = page ? (page.indexOf("admin-") === 0 ? "/admin/" + page.replace(/^admin-/, "").replace(/\\.html.*$/, "") : "/user/" + page.replace(/\\.html.*$/, "")) : "/";');
  output = output.replace(/window\.location\.href\s*=\s*returnPage\s*;?/g,
    'window.location.href = returnPage ? (returnPage.indexOf("/") === 0 ? returnPage : ("/user/" + returnPage.replace(/\\.html.*$/, ""))) : "/user/dashboard";');
  const declarations = [...output.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(match => match[1]);
  if (declarations.length) {
    output += `\n${[...new Set(declarations)].map(name => `window.${name}=typeof ${name}==="function"?${name}:window.${name};`).join('\n')}\n`;
  }
  return output;
}

function OriginalPage({ config }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [body, setBody] = useState('');

  useEffect(() => {
    let active = true;
    const links = [];
    setBody('');

    config.css.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });
    const polish = document.createElement('link');
    polish.rel = 'stylesheet';
    polish.href = '/ui-polish.css';
    document.head.appendChild(polish);
    links.push(polish);
    const pageStyles = document.createElement('link');
    pageStyles.rel = 'stylesheet';
    pageStyles.href = '/page-styles.css';
    document.head.appendChild(pageStyles);
    links.push(pageStyles);

    (async () => {
      try {
        const response = await fetch(config.html);
        const text = await response.text();
        const parsed = new DOMParser().parseFromString(text, 'text/html');
        document.title = parsed.title || 'Future Wave';
        parsed.querySelectorAll('script').forEach(script => script.remove());
        const base = config.html.replace(/[^/]+$/, '');
        parsed.querySelectorAll('[src]').forEach(element => {
          const value = element.getAttribute('src');
          if (value && !/^(?:https?:|data:|blob:)/i.test(value)) {
            element.setAttribute('src', base + value.replace(/^\.\//, '').replace(/^\/+/, ''));
          }
        });
        if (config.path === '/admin/dashboard') {
          const feedbackButton = [...parsed.querySelectorAll('button')].find(button =>
            button.textContent.trim() === 'Feedback'
          );
          if (feedbackButton) feedbackButton.textContent = 'View Feedback';
        }
        if (!active) return;
        setBody(parsed.body.innerHTML);
      } catch (error) {
        console.error('Unable to load original page:', error);
      }
    })();

    return () => {
      active = false;
      links.forEach(link => link.remove());
    };
  }, [config, location.pathname]);

  useEffect(() => {
    if (!body) return;
    let active = true;
    window.onload = null;

    const runScripts = async () => {
      for (const src of config.scripts || []) {
        try {
          const response = await fetch(src);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const source = await response.text();
          window.eval(transformScript(source, config.ns));
          if (!active) return;
        } catch (error) {
          console.error('Unable to run original script:', src, error);
        }
      }
      if (config.path === '/user/place' && typeof window.loadUserPlaces === 'function') {
        window.loadUserPlaces();
      }
      if (config.path === '/admin/place' && typeof window.loadPlaces === 'function') {
        window.loadPlaces();
      }
      if (config.path === '/user/about' && typeof window.loadAbout === 'function') {
        window.loadAbout();
      }
      if (config.path === '/user/report' && typeof window.onload === 'function') {
        window.onload();
      }
      if (config.path.startsWith('/admin/') && config.path !== '/admin/place' &&
          typeof window.onload === 'function') {
        window.onload();
      }
    };

    runScripts();
    const handleClick = event => {
      const anchor = event.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:)/i.test(href)) return;
      event.preventDefault();
      navigate(mapPageUrl(href, config.ns));
    };
    document.addEventListener('click', handleClick, true);
    return () => {
      active = false;
      document.removeEventListener('click', handleClick, true);
    };
  }, [body, config, navigate]);

  const pageClass = config.path === '/'
    ? 'welcome'
    : config.path.slice(1).replace(/\//g, '-');

  return <div className={`page page-${pageClass}`} dangerouslySetInnerHTML={{ __html: body }} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(config => (
          <Route key={config.path} path={config.path} element={<OriginalPage config={config} />} />
        ))}
        <Route path="/user/login" element={<Navigate to="/user/dashboard" replace />} />
        <Route path="/user/register" element={<Navigate to="/user/dashboard" replace />} />
        <Route path="/admin/login" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<OriginalPage config={routes[0]} />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
