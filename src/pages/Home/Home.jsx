import { useEffect, useState } from 'react';
import './Home.css';


const Home = ({ profile, hero, navigateToSection }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [key, setKey] = useState(0);

  // Image overlay effect
  const overlayImages = [
    '/Jack_Nicholson.png',
    '/pegasushelm.jpg',
    '/mutant_head.png',
    '/Thor_cgprotege.png',
    '/warlord.png'
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % overlayImages.length);
      setKey((prev) => prev + 1);
    }, 8000);  
    
    return () => clearInterval(imageInterval);
  }, [overlayImages.length]);

  useEffect(() => {
    const subtitleElement = document.getElementById('typing-subtitle');
    if (!subtitleElement) return;

    // Only use hero.subheadline if provided (either array or non-empty string).
    const subtitles = Array.isArray(hero?.subheadline) && hero.subheadline.length
      ? hero.subheadline
      : (typeof hero?.subheadline === 'string' && hero.subheadline.trim().length)
        ? [hero.subheadline.trim()]
        : null;

    if (!subtitles || subtitles.length === 0) {
      // No subtitles provided: leave subtitle empty and do not run the animation
      subtitleElement.textContent = '';
      return;
    }

    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let timeoutId = null;

    const typeWriter = () => {
      const currentSubtitle = subtitles[currentIndex] || '';

      if (isDeleting) {
        currentText = currentSubtitle.substring(0, Math.max(0, currentText.length - 1));
      } else {
        currentText = currentSubtitle.substring(0, Math.min(currentSubtitle.length, currentText.length + 1));
      }

      subtitleElement.textContent = currentText;

      let typeSpeed = isDeleting ? 100 : 200;

      if (!isDeleting && currentText === currentSubtitle) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % subtitles.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(typeWriter, typeSpeed);
    };

    typeWriter();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hero]);

  // Animated Code Background Effect
  useEffect(() => {
    const container = document.getElementById('code-background-container');
    if (!container) {
      console.error('Code background container not found!');
      return;
    }

    const codeSnippets = [
      // Python - Complex Machine Learning Pipeline
      {
        lang: 'python',
        code: `<span class="keyword">class</span> <span class="className">NeuralNetwork</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(self, layer_sizes, learning_rate=<span class="number">0.01</span>):
        self.layers = layer_sizes
        self.lr = learning_rate
        self.weights = [np.<span class="function">random</span>.<span class="function">randn</span>(layer_sizes[i], layer_sizes[i+<span class="number">1</span>]) 
                       <span class="keyword">for</span> i <span class="keyword">in</span> <span class="function">range</span>(<span class="function">len</span>(layer_sizes)-<span class="number">1</span>)]
        self.biases = [np.<span class="function">zeros</span>((<span class="number">1</span>, layer_sizes[i+<span class="number">1</span>])) 
                      <span class="keyword">for</span> i <span class="keyword">in</span> <span class="function">range</span>(<span class="function">len</span>(layer_sizes)-<span class="number">1</span>)]
    
    <span class="keyword">def</span> <span class="function">sigmoid</span>(self, z):
        <span class="keyword">return</span> <span class="number">1</span> / (<span class="number">1</span> + np.<span class="function">exp</span>(-z))
    
    <span class="keyword">def</span> <span class="function">forward_propagation</span>(self, X):
        activations = [X]
        <span class="keyword">for</span> w, b <span class="keyword">in</span> <span class="function">zip</span>(self.weights, self.biases):
            z = np.<span class="function">dot</span>(activations[-<span class="number">1</span>], w) + b
            activations.<span class="function">append</span>(self.<span class="function">sigmoid</span>(z))
        <span class="keyword">return</span> activations`
      },
      {
        lang: 'python',
        code: `<span class="keyword">import</span> pandas <span class="keyword">as</span> pd
<span class="keyword">import</span> numpy <span class="keyword">as</span> np
<span class="keyword">from</span> sklearn.preprocessing <span class="keyword">import</span> StandardScaler

<span class="keyword">def</span> <span class="function">preprocess_dataset</span>(df, target_col, test_size=<span class="number">0.2</span>):
    numeric_cols = df.<span class="function">select_dtypes</span>(include=[np.number]).<span class="variable">columns</span>
    df[numeric_cols] = df[numeric_cols].<span class="function">fillna</span>(df[numeric_cols].<span class="function">mean</span>())
    
    X = df.<span class="function">drop</span>(columns=[target_col])
    y = df[target_col]
    
    scaler = <span class="className">StandardScaler</span>()
    X_scaled = scaler.<span class="function">fit_transform</span>(X)
    
    X_train, X_test, y_train, y_test = <span class="function">train_test_split</span>(
        X_scaled, y, test_size=test_size, random_state=<span class="number">42</span>
    )
    
    <span class="keyword">return</span> X_train, X_test, y_train, y_test, scaler`
      },
      // Java - Complex Data Structures
      {
        lang: 'java',
        code: `<span class="keyword">public class</span> <span class="className">AVLTree</span><<span class="className">T</span> <span class="keyword">extends</span> <span class="className">Comparable</span><<span class="className">T</span>>> {
    <span class="keyword">private class</span> <span class="className">Node</span> {
        T data;
        Node left, right;
        <span class="keyword">int</span> height;
        
        <span class="className">Node</span>(T data) {
            <span class="keyword">this</span>.data = data;
            <span class="keyword">this</span>.height = <span class="number">1</span>;
        }
    }
    
    <span class="keyword">private</span> Node root;
    
    <span class="keyword">private int</span> <span class="function">height</span>(Node node) {
        <span class="keyword">return</span> node == <span class="keyword">null</span> ? <span class="number">0</span> : node.height;
    }
    
    <span class="keyword">private int</span> <span class="function">getBalance</span>(Node node) {
        <span class="keyword">return</span> node == <span class="keyword">null</span> ? <span class="number">0</span> : <span class="function">height</span>(node.left) - <span class="function">height</span>(node.right);
    }
    
    <span class="keyword">private</span> Node <span class="function">rightRotate</span>(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.<span class="function">max</span>(<span class="function">height</span>(y.left), <span class="function">height</span>(y.right)) + <span class="number">1</span>;
        x.height = Math.<span class="function">max</span>(<span class="function">height</span>(x.left), <span class="function">height</span>(x.right)) + <span class="number">1</span>;
        <span class="keyword">return</span> x;
    }
}`
      },
      {
        lang: 'java',
        code: `<span class="keyword">import</span> java.util.concurrent.*;
<span class="keyword">import</span> java.util.concurrent.locks.*;

<span class="keyword">public class</span> <span class="className">ThreadSafeCache</span><<span class="className">K</span>, <span class="className">V</span>> {
    <span class="keyword">private final</span> ConcurrentHashMap<<span class="className">K</span>, <span class="className">V</span>> cache;
    <span class="keyword">private final</span> ReadWriteLock lock = <span class="keyword">new</span> <span class="className">ReentrantReadWriteLock</span>();
    <span class="keyword">private final int</span> maxSize;
    
    <span class="keyword">public</span> <span class="className">ThreadSafeCache</span>(<span class="keyword">int</span> maxSize) {
        <span class="keyword">this</span>.cache = <span class="keyword">new</span> ConcurrentHashMap<>();
        <span class="keyword">this</span>.maxSize = maxSize;
    }
    
    <span class="keyword">public</span> V <span class="function">get</span>(<span class="className">K</span> key) {
        lock.readLock().<span class="function">lock</span>();
        <span class="keyword">try</span> {
            <span class="keyword">return</span> cache.<span class="function">get</span>(key);
        } <span class="keyword">finally</span> {
            lock.readLock().<span class="function">unlock</span>();
        }
    }
    
    <span class="keyword">public void</span> <span class="function">put</span>(<span class="className">K</span> key, <span class="className">V</span> value) {
        lock.writeLock().<span class="function">lock</span>();
        <span class="keyword">try</span> {
            <span class="keyword">if</span> (cache.<span class="function">size</span>() >= maxSize) {
                cache.<span class="function">remove</span>(cache.<span class="function">keys</span>().<span class="function">nextElement</span>());
            }
            cache.<span class="function">put</span>(key, value);
        } <span class="keyword">finally</span> {
            lock.writeLock().<span class="function">unlock</span>();
        }
    }
}`
      },
      // C++ - Complex Algorithms
      {
        lang: 'cpp',
        code: `<span class="keyword">#include</span> <span class="operator">&lt;</span>vector<span class="operator">&gt;</span>
<span class="keyword">#include</span> <span class="operator">&lt;</span>queue<span class="operator">&gt;</span>

<span class="keyword">template</span><<span class="keyword">typename</span> T>
<span class="keyword">class</span> <span class="className">Graph</span> {
<span class="keyword">private</span>:
    <span class="keyword">struct</span> <span class="className">Edge</span> {
        <span class="keyword">int</span> dest;
        T weight;
        <span class="className">Edge</span>(<span class="keyword">int</span> d, T w) : dest(d), weight(w) {}
    };
    
    std::vector<std::vector<<span class="className">Edge</span>>> adjList;
    <span class="keyword">int</span> vertices;
    
<span class="keyword">public</span>:
    <span class="className">Graph</span>(<span class="keyword">int</span> v) : vertices(v) {
        adjList.<span class="function">resize</span>(v);
    }
    
    <span class="keyword">void</span> <span class="function">addEdge</span>(<span class="keyword">int</span> src, <span class="keyword">int</span> dest, T weight) {
        adjList[src].<span class="function">push_back</span>(<span class="className">Edge</span>(dest, weight));
    }
    
    std::vector<T> <span class="function">dijkstra</span>(<span class="keyword">int</span> start) {
        std::vector<T> dist(vertices, std::numeric_limits<T>::<span class="function">max</span>());
        std::priority_queue<std::pair<T, <span class="keyword">int</span>>,
                          std::vector<std::pair<T, <span class="keyword">int</span>>>,
                          std::greater<>> pq;
        
        dist[start] = <span class="number">0</span>;
        pq.<span class="function">push</span>({<span class="number">0</span>, start});
        
        <span class="keyword">while</span> (!pq.<span class="function">empty</span>()) {
            <span class="keyword">auto</span> [d, u] = pq.<span class="function">top</span>();
            pq.<span class="function">pop</span>();
            
            <span class="keyword">if</span> (d > dist[u]) <span class="keyword">continue</span>;
            
            <span class="keyword">for</span> (<span class="keyword">const auto</span>& edge : adjList[u]) {
                <span class="keyword">int</span> v = edge.dest;
                T weight = edge.weight;
                
                <span class="keyword">if</span> (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.<span class="function">push</span>({dist[v], v});
                }
            }
        }
        <span class="keyword">return</span> dist;
    }
};`
      },
      {
        lang: 'cpp',
        code: `<span class="keyword">template</span><<span class="keyword">typename</span> T, <span class="keyword">size_t</span> BlockSize = <span class="number">4096</span>>
<span class="keyword">class</span> <span class="className">MemoryPool</span> {
<span class="keyword">private</span>:
    <span class="keyword">union</span> <span class="className">Node</span> {
        T element;
        Node* next;
    };
    
    Node* freeList;
    std::vector<<span class="keyword">char</span>*> blocks;
    <span class="keyword">size_t</span> allocatedBlocks;
    
    <span class="keyword">void</span> <span class="function">allocateBlock</span>() {
        <span class="keyword">char</span>* newBlock = <span class="keyword">new char</span>[BlockSize];
        blocks.<span class="function">push_back</span>(newBlock);
        
        <span class="keyword">size_t</span> numNodes = BlockSize / <span class="keyword">sizeof</span>(Node);
        <span class="keyword">for</span> (<span class="keyword">size_t</span> i = <span class="number">0</span>; i < numNodes - <span class="number">1</span>; ++i) {
            <span class="keyword">reinterpret_cast</span><Node*>(newBlock + i * <span class="keyword">sizeof</span>(Node))->next =
                <span class="keyword">reinterpret_cast</span><Node*>(newBlock + (i + <span class="number">1</span>) * <span class="keyword">sizeof</span>(Node));
        }
        <span class="keyword">reinterpret_cast</span><Node*>(newBlock + (numNodes - <span class="number">1</span>) * <span class="keyword">sizeof</span>(Node))->next = freeList;
        freeList = <span class="keyword">reinterpret_cast</span><Node*>(newBlock);
    }
    
<span class="keyword">public</span>:
    <span class="className">MemoryPool</span>() : freeList(<span class="keyword">nullptr</span>), allocatedBlocks(<span class="number">0</span>) {
        <span class="function">allocateBlock</span>();
    }
    
    T* <span class="function">allocate</span>() {
        <span class="keyword">if</span> (!freeList) {
            <span class="function">allocateBlock</span>();
        }
        Node* node = freeList;
        freeList = node->next;
        <span class="keyword">return</span> <span class="keyword">reinterpret_cast</span><T*>(node);
    }
};`
      },
      // JavaScript - Complex Async Patterns
      {
        lang: 'javascript',
        code: `<span class="keyword">class</span> <span class="className">Store</span> {
    <span class="function">constructor</span>(reducer, initialState = {}) {
        <span class="keyword">this</span>.reducer = reducer;
        <span class="keyword">this</span>.state = initialState;
        <span class="keyword">this</span>.listeners = <span class="keyword">new</span> <span class="className">Set</span>();
        <span class="keyword">this</span>.middleware = [];
    }
    
    <span class="function">getState</span>() {
        <span class="keyword">return</span> { ...<span class="keyword">this</span>.state };
    }
    
    <span class="function">dispatch</span>(action) {
        <span class="keyword">const</span> chain = <span class="keyword">this</span>.middleware.<span class="function">map</span>(mw => 
            mw({
                getState: <span class="keyword">this</span>.getState.<span class="function">bind</span>(<span class="keyword">this</span>),
                dispatch: <span class="keyword">this</span>.dispatch.<span class="function">bind</span>(<span class="keyword">this</span>)
            })
        );
        
        <span class="keyword">const</span> composedDispatch = chain.<span class="function">reduceRight</span>(
            (next, mw) => mw(next),
            (act) => {
                <span class="keyword">const</span> newState = <span class="keyword">this</span>.<span class="function">reducer</span>(<span class="keyword">this</span>.state, act);
                <span class="keyword">if</span> (newState !== <span class="keyword">this</span>.state) {
                    <span class="keyword">this</span>.state = newState;
                    <span class="keyword">this</span>.listeners.<span class="function">forEach</span>(listener => <span class="function">listener</span>());
                }
            }
        );
        
        <span class="keyword">return</span> <span class="function">composedDispatch</span>(action);
    }
    
    <span class="function">subscribe</span>(listener) {
        <span class="keyword">this</span>.listeners.<span class="function">add</span>(listener);
        <span class="keyword">return</span> () => <span class="keyword">this</span>.listeners.<span class="function">delete</span>(listener);
    }
}`
      },
      {
        lang: 'javascript',
        code: `<span class="keyword">import</span> { useState, useEffect, useRef } <span class="keyword">from</span> <span class="string">'react'</span>;

<span class="keyword">const</span> cache = <span class="keyword">new</span> <span class="className">Map</span>();

<span class="keyword">function</span> <span class="function">useDataFetcher</span>(url, options = {}) {
    <span class="keyword">const</span> [data, setData] = <span class="function">useState</span>(<span class="keyword">null</span>);
    <span class="keyword">const</span> [loading, setLoading] = <span class="function">useState</span>(<span class="keyword">true</span>);
    <span class="keyword">const</span> [error, setError] = <span class="function">useState</span>(<span class="keyword">null</span>);
    <span class="keyword">const</span> abortController = <span class="function">useRef</span>(<span class="keyword">null</span>);
    
    <span class="function">useEffect</span>(() => {
        <span class="keyword">const</span> cacheKey = <span class="string">\`\${url}-\${JSON.stringify(options)}\`</span>;
        
        <span class="keyword">if</span> (cache.<span class="function">has</span>(cacheKey)) {
            <span class="function">setData</span>(cache.<span class="function">get</span>(cacheKey));
            <span class="function">setLoading</span>(<span class="keyword">false</span>);
            <span class="keyword">return</span>;
        }
        
        abortController.current = <span class="keyword">new</span> <span class="className">AbortController</span>();
        
        <span class="keyword">const</span> <span class="function">fetchData</span> = <span class="keyword">async</span> () => {
            <span class="keyword">try</span> {
                <span class="function">setLoading</span>(<span class="keyword">true</span>);
                <span class="keyword">const</span> response = <span class="keyword">await</span> <span class="function">fetch</span>(url, {
                    ...options,
                    signal: abortController.current.signal
                });
                
                <span class="keyword">if</span> (!response.ok) {
                    <span class="keyword">throw new</span> <span class="className">Error</span>(<span class="string">\`HTTP error! status: \${response.status}\`</span>);
                }
                
                <span class="keyword">const</span> result = <span class="keyword">await</span> response.<span class="function">json</span>();
                cache.<span class="function">set</span>(cacheKey, result);
                <span class="function">setData</span>(result);
            } <span class="keyword">catch</span> (err) {
                <span class="function">setError</span>(err);
            }
        };
        
        <span class="function">fetchData</span>();
    }, [url]);
    
    <span class="keyword">return</span> { data, loading, error };
}`
      },
      {
        lang: 'python',
        code: `<span class="keyword">from</span> functools <span class="keyword">import</span> wraps
<span class="keyword">from</span> collections <span class="keyword">import</span> OrderedDict

<span class="keyword">class</span> <span class="className">LRUCache</span>:
    <span class="keyword">def</span> <span class="function">__init__</span>(self, capacity: <span class="keyword">int</span>):
        self.cache = <span class="className">OrderedDict</span>()
        self.capacity = capacity
    
    <span class="keyword">def</span> <span class="function">get</span>(self, key):
        <span class="keyword">if</span> key <span class="keyword">not in</span> self.cache:
            <span class="keyword">return</span> <span class="keyword">None</span>
        self.cache.<span class="function">move_to_end</span>(key)
        <span class="keyword">return</span> self.cache[key]
    
    <span class="keyword">def</span> <span class="function">put</span>(self, key, value):
        <span class="keyword">if</span> key <span class="keyword">in</span> self.cache:
            self.cache.<span class="function">move_to_end</span>(key)
        self.cache[key] = value
        <span class="keyword">if</span> <span class="function">len</span>(self.cache) > self.capacity:
            self.cache.<span class="function">popitem</span>(last=<span class="keyword">False</span>)

<span class="keyword">def</span> <span class="function">memoize_with_ttl</span>(ttl_seconds=<span class="number">60</span>):
    <span class="keyword">def</span> <span class="function">decorator</span>(func):
        cache = {}
        
        @<span class="function">wraps</span>(func)
        <span class="keyword">def</span> <span class="function">wrapper</span>(*args, **kwargs):
            key = <span class="function">str</span>(args) + <span class="function">str</span>(kwargs)
            current_time = time.<span class="function">time</span>()
            
            <span class="keyword">if</span> key <span class="keyword">in</span> cache:
                result, timestamp = cache[key]
                <span class="keyword">if</span> current_time - timestamp < ttl_seconds:
                    <span class="keyword">return</span> result
            
            result = <span class="function">func</span>(*args, **kwargs)
            cache[key] = (result, current_time)
            <span class="keyword">return</span> result
        
        <span class="keyword">return</span> wrapper
    <span class="keyword">return</span> decorator`
      },
      {
        lang: 'java',
        code: `<span class="keyword">import</span> java.util.concurrent.*;

<span class="keyword">public class</span> <span class="className">TaskProcessor</span><<span class="className">T</span>> {
    <span class="keyword">private final</span> BlockingQueue<<span class="className">T</span>> queue;
    <span class="keyword">private final</span> ExecutorService executor;
    <span class="keyword">private volatile boolean</span> running = <span class="keyword">true</span>;
    
    <span class="keyword">public</span> <span class="className">TaskProcessor</span>(<span class="keyword">int</span> queueSize, <span class="keyword">int</span> numWorkers) {
        <span class="keyword">this</span>.queue = <span class="keyword">new</span> LinkedBlockingQueue<>(queueSize);
        <span class="keyword">this</span>.executor = Executors.<span class="function">newFixedThreadPool</span>(numWorkers);
        <span class="function">startWorkers</span>();
    }
    
    <span class="keyword">private void</span> <span class="function">startWorkers</span>() {
        <span class="keyword">for</span> (<span class="keyword">int</span> i = <span class="number">0</span>; i < numWorkers; i++) {
            executor.<span class="function">submit</span>(() -> {
                <span class="keyword">while</span> (running) {
                    <span class="keyword">try</span> {
                        <span class="className">T</span> task = queue.<span class="function">poll</span>(<span class="number">1</span>, TimeUnit.SECONDS);
                        <span class="keyword">if</span> (task != <span class="keyword">null</span>) {
                            <span class="function">processTask</span>(task);
                        }
                    } <span class="keyword">catch</span> (InterruptedException e) {
                        Thread.<span class="function">currentThread</span>().<span class="function">interrupt</span>();
                        <span class="keyword">break</span>;
                    }
                }
            });
        }
    }
    
    <span class="keyword">public boolean</span> <span class="function">submitTask</span>(<span class="className">T</span> task, <span class="keyword">long</span> timeout, TimeUnit unit) 
            <span class="keyword">throws</span> InterruptedException {
        <span class="keyword">return</span> queue.<span class="function">offer</span>(task, timeout, unit);
    }
}`
      },
      {
        lang: 'cpp',
        code: `<span class="keyword">#include</span> <span class="operator">&lt;</span>atomic<span class="operator">&gt;</span>
<span class="keyword">#include</span> <span class="operator">&lt;</span>memory<span class="operator">&gt;</span>

<span class="keyword">template</span><<span class="keyword">typename</span> T>
<span class="keyword">class</span> <span class="className">LockFreeStack</span> {
<span class="keyword">private</span>:
    <span class="keyword">struct</span> <span class="className">Node</span> {
        std::shared_ptr<T> data;
        Node* next;
        
        <span class="className">Node</span>(<span class="keyword">const</span> T& value) 
            : data(std::<span class="function">make_shared</span><T>(value)), next(<span class="keyword">nullptr</span>) {}
    };
    
    std::atomic<Node*> head;
    std::atomic<<span class="keyword">int</span>> nodeCount;
    
<span class="keyword">public</span>:
    <span class="className">LockFreeStack</span>() : head(<span class="keyword">nullptr</span>), nodeCount(<span class="number">0</span>) {}
    
    <span class="keyword">void</span> <span class="function">push</span>(<span class="keyword">const</span> T& value) {
        Node* newNode = <span class="keyword">new</span> <span class="className">Node</span>(value);
        newNode->next = head.<span class="function">load</span>(std::memory_order_relaxed);
        
        <span class="keyword">while</span> (!head.<span class="function">compare_exchange_weak</span>(
            newNode->next,
            newNode,
            std::memory_order_release,
            std::memory_order_relaxed
        ));
        
        nodeCount.<span class="function">fetch_add</span>(<span class="number">1</span>, std::memory_order_relaxed);
    }
    
    std::shared_ptr<T> <span class="function">pop</span>() {
        Node* oldHead = head.<span class="function">load</span>(std::memory_order_relaxed);
        
        <span class="keyword">while</span> (oldHead && !head.<span class="function">compare_exchange_weak</span>(
            oldHead,
            oldHead->next,
            std::memory_order_acquire,
            std::memory_order_relaxed
        ));
        
        <span class="keyword">if</span> (oldHead) {
            std::shared_ptr<T> result = oldHead->data;
            <span class="keyword">delete</span> oldHead;
            <span class="keyword">return</span> result;
        }
        
        <span class="keyword">return</span> std::shared_ptr<T>();
    }
};`
      }
    ];

  const activeSnippets = [];
  const maxSnippets = 1; // lowered so only a few snippets show at once

    function getRandomPosition() {
      // use the container size so snippets can move across the full code-background area
      // bias x toward the left side by using a power curve (exponent > 1)
      const snippetW = 1900;
      const snippetH = 900;
      const maxX = Math.max(0, container.clientWidth - snippetW);
      const maxY = Math.max(0, container.clientHeight - snippetH);
      const biasExponent = 5.8; // >1 biases positions toward 0 (left)
      const x = Math.pow(Math.random(), biasExponent) * maxX;
      const y = Math.random() * maxY;
      return { x, y };
    }

    function getRandomVelocity() {
      return {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      };
    }

    function createSnippet() {
      if (activeSnippets.length >= maxSnippets) return;

      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const div = document.createElement('div');
      div.className = 'code-snippet';
      div.innerHTML = snippet.code;

      const pos = getRandomPosition();
      const vel = getRandomVelocity();

      div.style.left = pos.x + 'px';
      div.style.top = pos.y + 'px';
      div.style.position = 'absolute';

      container.appendChild(div);
      console.log('Created snippet at:', pos);

      const snippetObj = {
        element: div,
        x: pos.x,
        y: pos.y,
        vx: vel.x,
        vy: vel.y,
        width: 600,
        height: 400
      };

      activeSnippets.push(snippetObj);

      setTimeout(() => {
        const index = activeSnippets.indexOf(snippetObj);
        if (index > -1) {
          activeSnippets.splice(index, 1);
          div.remove();
        }
      }, 15000);
    }

    function animate() {
      activeSnippets.forEach(snippet => {
        snippet.x += snippet.vx;
        snippet.y += snippet.vy;

        if (snippet.x <= 0 || snippet.x + snippet.width >= window.innerWidth) {
          snippet.vx *= -1;
        }
        if (snippet.y <= 0 || snippet.y + snippet.height >= window.innerHeight) {
          snippet.vy *= -1;
        }

        snippet.element.style.left = snippet.x + 'px';
        snippet.element.style.top = snippet.y + 'px';
      });

      return requestAnimationFrame(animate);
    }

  const intervalId = setInterval(createSnippet, 3000); // slower spawn rate
    let animationFrameId = animate();

    // Create initial snippets immediately
    // create a small initial set of snippets
    for (let i = 0; i < 1; i++) {
      setTimeout(createSnippet, i * 500);
    }

    console.log('Animation started with', activeSnippets.length, 'snippets');

    return () => {
      if (typeof window !== 'undefined') {
        window.__animatedCodeBackgroundStarted = false;
      }
      clearInterval(intervalId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      activeSnippets.forEach(snippet => snippet.element.remove());
      activeSnippets.length = 0;
      console.log('Animation cleaned up');
    };
  }, []);

  return (
    <section className="hero home-section">
      <div id="code-background-container" className="code-background"></div>
      {/* Image overlay container - displays rotating background images from public/ */}
      <div className="image-overlay" aria-hidden="true">
        <div
          key={key}
          className={`overlay-item ${currentImageIndex % 2 === 0 ? 'left' : 'right'}`}
        >
          <img
            src={overlayImages[currentImageIndex]}
            // alt={overlayLabels[currentImageIndex] || 'decorative background'}
            className="zoom-image"
          />
          {/* <div className="image-label">{overlayLabels[currentImageIndex]}</div> */}
        </div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{hero?.headline}</h1>
        <h2 id="typing-subtitle" className="hero-subtitle" aria-live="polite"></h2>
        <p className="hero-description">{profile?.bio}</p>
        {/* Social / contact links from profile (display above CTAs) */}
        <div className="profile-links" style={{marginBottom: '1rem'}}>
          {profile?.github && (
            <a className="link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg className="social-icon github-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M12 .297a12 12 0 00-3.793 23.4c.6.11.793-.26.793-.577v-2.234c-3.218.7-3.893-1.55-3.893-1.55-.528-1.34-1.293-1.697-1.293-1.697-1.057-.723.08-.708.08-.708 1.17.082 1.785 1.203 1.785 1.203 1.037 1.776 2.723 1.263 3.388.967.105-.752.405-1.263.737-1.553-2.567-.293-5.267-1.283-5.267-5.71 0-1.262.45-2.295 1.188-3.102-.119-.293-.514-1.473.113-3.07 0 0 .97-.31 3.18 1.186a11.06 11.06 0 015.79 0c2.21-1.496 3.18-1.186 3.18-1.186.627 1.597.232 2.777.114 3.07.74.807 1.187 1.84 1.187 3.102 0 4.438-2.704 5.412-5.28 5.696.417.36.787 1.07.787 2.157v3.197c0 .32.19.694.8.576A12 12 0 0012 .297"/>
              </svg>
              <span>GitHub</span>
            </a>
          )}
          {profile?.linkedin && (
            <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">🔗 LinkedIn</a>
          )}
          {profile?.email && (
            <a className="link" href={`mailto:${profile.email}`}>✉️ Email</a>
          )}
        </div>

        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigateToSection && navigateToSection('projects')}>
            View Projects
          </button>
          <button className="btn btn-secondary" onClick={() => navigateToSection && navigateToSection('contact')}>
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;