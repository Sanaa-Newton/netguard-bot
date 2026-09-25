export default defineComponent({
  async run({ steps, $ }) {
    // Respond to Slack immediately so the slash command doesn't time out.
    await $.respond({
      immediate: true,
      status: 200,
      body: "",
    });

    const tips = [
      "🔐 Security Tip: Enable multi-factor authentication whenever possible.",
      "🌐 Network Tip: Network segmentation can help limit the impact of a compromised device.",
      "⚠️ Security Tip: Be cautious with unexpected links or attachments, even when they appear to come from someone you know.",
      "🛡️ Security Tip: Use strong, unique passwords for your accounts.",
      "🌐 Network Tip: Keeping devices and network equipment updated can help reduce security vulnerabilities.",
    ];

    const message = tips[Math.floor(Math.random() * tips.length)];

    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
      body: JSON.stringify({
        channel: steps.trigger.event.body.channel_id,
        text: message,
      }),
    });
  },
});
