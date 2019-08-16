(ns scheduler.core
    (:require ))

(enable-console-print!)

(defn get-day-from-time
  "Creates day using the time object provided"
  [time]
  {(.-day time) [time]}
)

(defn create-schedule-with-section
  "Creates a schedule using the section provided"
  [section]
  ;; this doesnt work since it overrides the previous map keys aka a lab and lec on same day
  (into {} (map get-day-from-time (.-times (.-meetingInformation section))))
)

(defn ^:export get-new-schedules-with-sections
  "Gets a new section and previous schedules as input and returns new schedules with that section added"
  [newSections, schedules]
  (cond
    (empty? schedules) (clj->js (map create-schedule-with-section newSections))
    
  )
)

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Hello world!"}))


(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)
