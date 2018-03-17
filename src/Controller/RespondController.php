<?php

namespace App\Controller;

use App\Entity\RSVP;
use GeoSocio\HttpSerializer\Annotation\RequestGroups;
use GeoSocio\HttpSerializer\Annotation\ResponseGroups;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Twig\Environment;

/**
 * @Route(
 *    service="app.controller_respond",
 *    defaults = {
 *       "_format" = "json"
 *    }
 * )
 */
class RespondController
{
    /**
     * @var RegistryInterface
     */
    protected $doctrine;

    /**
     * @var \Swift_Mailer
     */
    protected $mailer;

    /**
     * @var Environment
     */
    protected $twig;

    /**
     * @var array
     */
    protected $site;

    /**
     * @var array
     */
    protected $bride;

    /**
     * @var array
     */
    protected $groom;

    /**
     * Respond Controller
     */
    public function __construct(
        RegistryInterface $doctrine,
        \Swift_Mailer $mailer,
        Environment $twig,
        array $site,
        array $bride,
        array $groom
    ) {
          $this->doctrine = $doctrine;
          $this->mailer = $mailer;
          $this->twig = $twig;
          $this->site = $site;
          $this->bride = $bride;
          $this->groom = $groom;
    }

    /**
     * @Route("/rsvp")
     * @Method("POST")
     * @RequestGroups("create")
     * @ResponseGroups("read")
     *
     * @param RSVP $rsvp
     *
     * @return RSVP
     */
    public function createAction(RSVP $rsvp) : RSVP
    {
        $em = $this->doctrine->getManager();

        // Save the RSVP
        $em->persist($rsvp);
        $em->flush();

        // Send email to the bride/groom.
        $message = (new \Swift_Message('Wedding RSVP (' . $rsvp->getId() . ')'))
            ->setFrom($this->site)
            ->setReplyTo([
              $rsvp->getEmail() => $rsvp->getFirstName().' '.$rsvp->getLastName(),
            ])
            ->setTo($this->bride + $this->groom)
            ->setBody($this->twig->render('email.txt.twig', ['rsvp' => $rsvp]));

        $this->mailer->send($message);

        // Send email to person filling out the form.
        $title = $rsvp->getAttending() ? 'Invitation Accepted' : 'Invitation Declined';
        $message = (new \Swift_Message($title))
          ->setFrom($this->site)
          ->setReplyTo($this->bride)
          ->setTo([
            $rsvp->getEmail() => $rsvp->getFirstName().' '.$rsvp->getLastName()
          ])
          ->setBody($this->twig->render('thanks.html.twig', ['attending' => $rsvp->getAttending()]), 'text/html');

        $this->mailer->send($message);

        return $rsvp;
    }
}
