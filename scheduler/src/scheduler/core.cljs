(ns scheduler.core
    (:require ))

(enable-console-print!)

(defn get-day-from-time
  "Creates day using the time object provided"
  [time]
  {(.-day time) [time]}
)

(defn ^:export create-schedule-with-section
  "Creates a schedule using the section provided"
  [section]
  (clj->js (apply merge-with into (map get-day-from-time (.-times (.-meetingInformation section)))))
)

(defn ^:export get-new-schedules-with-sections
  "Gets a new section and previous schedules as input and returns new schedules with that section added"
  [newSections, schedules]
  (cond
    (empty? schedules) (clj->js (map create-schedule-with-section newSections))
  )
)

(js/console.log (clj->js (apply merge-with into
	  [{"Lisp" [1,2,3]
	   "ML" [10,11,12]}
	  {"Lisp" [4,5]
	   "ML" [13,14]}] )))

;; define your app data so that it doesn't get over-written on reload

(defonce app-state (atom {:text "Hello world!"}))


(defn on-js-reload []
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
)
