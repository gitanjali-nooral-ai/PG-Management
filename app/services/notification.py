import asyncio
from email.message import EmailMessage

import aiosmtplib
from sqlalchemy.orm import Session

from app.models.admin import Admin
from app.models.resident import Resident

from app.config.email import SMTP_HOST, SMTP_PORT
from app.config.security import decrypt


async def send_email(sender, password, recipient, subject, body):

    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = recipient
    msg["Subject"] = subject
    msg.set_content(body)

    await aiosmtplib.send(
        msg,
        hostname=SMTP_HOST,
        port=SMTP_PORT,
        start_tls=True,
        username=sender,
        password=password,
    )


async def send_bulk_email(db: Session, subject: str, messages: list[str]):

    admin = db.query(Admin).first()

    if not admin:
        raise Exception("Admin not found")

    sender = admin.smtp_sender_email
    password = decrypt(admin.smtp_app_password)

    residents = db.query(Resident).filter(
        Resident.email.isnot(None),
        Resident.status == "ACTIVE"
    ).all()

    semaphore = asyncio.Semaphore(20)

    async def worker(resident, body):

        async with semaphore:
            try:
                await send_email(
                    sender,
                    password,
                    resident.email,
                    subject,
                    body
                )
                print("Sent:", resident.email)

            except Exception as e:
                print("Failed:", resident.email, e)

    tasks = []

    for msg in messages:
        for r in residents:
            tasks.append(worker(r, msg))

    await asyncio.gather(*tasks)

    return len(residents) * len(messages)