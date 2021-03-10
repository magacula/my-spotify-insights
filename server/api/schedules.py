from apscheduler.schedulers.background import BackgroundScheduler

def test_job():
    print("----------this is background job")

bg_scheduler = BackgroundScheduler()
job = bg_scheduler.add_job(test_job, 'interval', minutes=1)
#bg_scheduler.start()
