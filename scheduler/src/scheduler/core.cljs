(ns scheduler.core
    (:require ))

(enable-console-print!)

(defn scheduler
  "This function gets a new section and previous schedules as input and returns new schedules with that section added"
  [newSection, schedules]
  (println newSection)
)

(scheduler '(1,2,3) '(7,8))

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Hello world!"}))


(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)
