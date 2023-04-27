/**
 * Web Peformance plays a major role in the sucess of any consumer-facing web application.
 * 
 * To measure WP across pages, Core Web Vital metrics are the golden standards.
 * CWV are the standard metrics from Google to measure UX of webpage.
 *  It measure different aspects of UX - loading, interactivity and visual stability.
 *  
 * Performance metrics are generally measured in one of two ways:
 * Field (RUM) - data collected from real users visting the website - CRUX reports, PSI, GSC
   Lab - data collected in a controlled environment with predefined device and network settings - Lighthouse

   Among those metrics, LCP and CLS are the most that affects  the speed of the page.
   LCP - Measures the time from when page starts loading to when large text block or image element is rendered.
   CLS - Measures how much the page layout shift.s unexpectedly when user lands on your page. (<=0.1)

   So, improving the LCP and CLS has been the primary goal for me as part of the Performance Initiative.

   The strategy I have laid out was in different aspects - Asset Opt, Build Opt, Delivery Opt,
   Testing & Monitoring and setting Performance Budgets

   ***ASSET OPTIMIZATION - 
    2.) We employed Responsive images by using srcset sizes and using <picture> element.
    Especially for pages with a heavy media footprint, we tookstep further with adaptive media loading by serving 
    low-quality images and videos on slow networks, blocking third-party scripts on slower devices.
    3.) Image compression was a quick win for us as moved to Webp from JPEG. Of course images do not block rendering,
     but they contribute heavily to poor LCP scores, and very often they are just too heavy and too large for 
     the device they are being consumed on.
    4.) In particular when we optimise for LCP, preloading critical images does really helpwhen browser discovers them
    too late in case of BG image or when mage tag rendered through JS in CSR.
    5.) Making sure we have width and height attributes so that browser reserves space and avoid LS on page load.
    6.) And coming to videos, we abandoned heavy animatedGIFs and moved to animated Webp/ HTML5 videos which i
    improved rendering time by 20%. (Video poster image)
    7.) Web fonts - Establish Preconnect to 3rd part origin that hosts our fonts. Preloading fonts was
     highly effective at making fonts discoverable early in the page load process. Thus we got rid of
     Flash of Unstyled Text and Flash of Invisible Text issue. font-display: optional WOFF2
     8.) Trimmed the size of JS by auditing the bundle size by using wpa plugin and we were able to replace
     heavy legacy libraries with latest lightweight alternatives. (Moment to day-fns). 
      Vs Code extension called ImportCost that displays inline in the editor the size of the imported package.
      All the web developers make use of that to know well-informed about the external modules they are importing

     ***BUILD OPTIMIZATION - 
    1.) Differential Serving - 
    The idea is to compile and serve two separate JavaScript bundles: the “regular” build, the one with 
    Babel-transforms and polyfills and serve them only to legacy browsers that actually need them, and 
    another bundle (same functionality) that has no transforms or polyfills.
    As a result, we help reduce blocking of the main thread by reducing the amount of scripts
     the browser needs to process. 
    2.) Webpack upgrade -
    Tree-shaking is a way to clean up your build process by only including code that is actually used in
     production and eliminate unused imports in Webpack. Webpack 4 also supported JSON tree shaking.
     Unused parts of a JSON document are removed from the generated JS bundle during the Webpack bundling process.
    3.) We leveraged Code Splitting in webpack by enabling SplitChunksPlugin to dedupe and load the chunk on-demand
    4.) Ensuring HTTP cache headers are properly set for static assets to leverage caching.
    5.) Predictive fetching 

    ***DELIVERY OPTIMIZATION - 
     1.) We moved to Brotli for text Compression - open source lossless data format. Brotli is more effective than Gzip
    reducing HTML,JS, CSS size by 20%. Brotli is widely supported in all modern browsers and all major CDNs support
    it out-of-the box.
    1.) Using defer to load critical javascript to avoid render-blocking resources.
    2.) Lazy load BTF expensive components with IntersectionObserver (load YT only on user scroll) and priority hints.
    3.) For image heavy pages, we initially load LQ or blurry images first and replace with actual image .
    4.) XXX - Serve Critical CSS
        <link rel="stylesheet"
        href="full.css"
        media="print"
        onload="this.media='all'" />
    5.) Warming up the connection to 3rd party origin to speed up delivery via Preconnect Resource hints.
    6.) Serving assets over Http2.One of the main advantages of HTTP/2 is that it allows us to send assets down
     the wire over a single connection.


     performance budget is a set of limits imposed on metrics that affect site performance.
     Their primary goal is to prevent regressions.
    IN development, We made use of 
     webpack which has performance features that will notify you when assets exceed specified limits.
    Bundlesize, allows you to define and run file size checks in your continuous integration (CI) pipeline.
 */